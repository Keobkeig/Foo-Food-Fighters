import cv2
cam_port = 0
cam = cv2.VideoCapture(cam_port) 
  

if not cam.isOpened():
    raise IOError("Cannot open webcam")

while True:
    ret, frame = cam.read()
    frame = cv2.resize(frame, None, fx=0.5, fy=0.5, interpolation=cv2.INTER_AREA)
    cv2.imshow('Food', frame)

    c = cv2.waitKey(1)
    if c == 27:
        cv2.imshow("Food", frame) 
        cv2.imwrite("Food.jpg", frame) 
        break
cv2.destroyAllWindows()
cam.release()
