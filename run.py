#!/Users/apple/Desktop/try_project/Gesture-Recognition/my_env/bin
import sys
sys.path.insert(0, "/usr/local/lib/python3.11/site-packages")
import cv2
from src.hand_tracker_nms import HandTrackerNMS
import src.extra
import joblib
import numpy as np
import socketio


WINDOW = "Hand Tracking"
PALM_MODEL_PATH = "/Users/apple/Desktop/try_project/Gesture-Recognition/models/palm_detection_without_custom_op.tflite"
LANDMARK_MODEL_PATH = "/Users/apple/Desktop/try_project/Gesture-Recognition/models/hand_landmark.tflite"
ANCHORS_PATH = "/Users/apple/Desktop/try_project/Gesture-Recognition/models/anchors.csv"

connections = src.extra.connections
int_to_char = src.extra.classes

detector = HandTrackerNMS(
    PALM_MODEL_PATH,
    LANDMARK_MODEL_PATH,
    ANCHORS_PATH,
    box_shift=0.2,
    box_enlarge=1.3
)

gesture_clf = joblib.load(r'/Users/apple/Desktop/try_project/Gesture-Recognition/models/gesture_clf.pkl')

sio = socketio.Client()

@sio.event
def connect():
    print('connection established')

@sio.on('output')
def on_output(lines):
    output = '<pre>{}</pre>'.format('\n'.join(lines))
    sio.emit('output', output)

def main():
    sio.connect('http://localhost:3000')
    print('client connected to server')
    capture = cv2.VideoCapture(0)

    while True:
        hasFrame, frame = capture.read()
        image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        points, bboxes, joints = detector(image)
        if points is not None:
            src.extra.draw_points(points, frame)
            pred_sign = src.extra.predict_sign(joints, gesture_clf, int_to_char)
            if letter == pred_sign:
                staticGesture += 1
            else:
                letter = pred_sign
                staticGesture = 0
            if staticGesture > 6:
                word.append(letter)
                sio.emit('output', letter)
                staticGesture = 0

        if points is None:
            try:
                if word[-1] != " ":
                    staticGesture += 1
                    if staticGesture > 6:
                        word.append(" ")
                        sio.emit('output', " ")
                        staticGesture = 0
            except IndexError:
                pass

        src.extra.draw_sign(word, frame, (50, 460))

        cv2.imshow(WINDOW, frame)
        key = cv2.waitKey(1)
        if key == 27:
            break
        if key == 8:
            try:
                del word[-1]
            except IndexError as e:
                print(e)

    capture.release()
    cv2.destroyAllWindows()

if __name__ == '__main__':
    main()
