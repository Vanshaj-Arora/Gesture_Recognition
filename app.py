import sys
sys.path.insert(0, "./site-packages")
from flask import Flask, render_template, Response, jsonify, request, redirect, url_for
from flask_cors import CORS
import json
import cv2
from src.hand_tracker_nms import HandTrackerNMS
import src.extra
import joblib
import numpy as np

WINDOW = "Hand Tracking"
PALM_MODEL_PATH = "./models/palm_detection_without_custom_op.tflite"
LANDMARK_MODEL_PATH = "./models/hand_landmark.tflite"
ANCHORS_PATH = "./models/anchors.csv"

connections = src.extra.connections
int_to_char = src.extra.classes

detector = HandTrackerNMS(
    PALM_MODEL_PATH,
    LANDMARK_MODEL_PATH,
    ANCHORS_PATH,
    box_shift=0.2,
    box_enlarge=1.3
)

gesture_clf = joblib.load(r'./models/gesture_clf.pkl')
def get_camera_index():
    for i in range(10):
        capture = cv2.VideoCapture(i)
        if capture.isOpened():
            print(f"Camera index {i} is available")
            capture.release()
            return i
    return -1

capture = cv2.VideoCapture(get_camera_index())
word = []
letter = None
staticGesture = 0
recognized_word=""
app = Flask(__name__, static_folder='./static',static_url_path='/')
CORS(app)

def gen_frames():
    letter=""
    while True:
        success, frame = capture.read()
        if not success:
            print('i happen not success')
            break
        else:
            print('i happen  success')
            image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            points, bboxes, joints = detector(image)
            if points is not None:
                src.extra.draw_points(points, frame)
                pred_sign = src.extra.predict_sign(joints, gesture_clf, int_to_char)
                if letter is not None and letter == pred_sign:
                    staticGesture += 1
                else:
                    letter = pred_sign
                    staticGesture = 0
                if staticGesture > 6:
                    word.append(letter)
                    print(letter)
                    staticGesture = 0

            if points is None:
                try:
                    if word[-1] != " ":
                        staticGesture += 1
                        if staticGesture > 6:
                            word.append(" ")
                            recognized_word = "".join(word)
                            print(recognized_word)
                            staticGesture = 0
                except IndexError:
                    pass


            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                    b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    if path == '':
        return app.send_static_file('index.html')
    else:
        return app.send_static_file(path)
@app.errorhandler(404)
def page_not_found(e):
    return redirect(url_for('catch_all'))

@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')
@app.route('/backspace', methods=['POST'])
def backspace():
    print('recieved')
    global word
    while len(word) > 0 and word[-1].isspace():
        word.pop()
    word.pop()
    recognized_word = word
    return jsonify({'recognized_word': recognized_word})

@app.route('/recognized_word', methods=['GET'])
def get_recognized_word():
    global word, recognized_word
    recognized_word = "".join(word)
    return jsonify({'recognized_word': recognized_word})
if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0',port=80,threaded=True)
