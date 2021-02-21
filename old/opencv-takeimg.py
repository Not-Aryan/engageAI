import cv2
import flask
from flask import *
from flask_moment import Moment
from datetime import datetime
import threading
from threading import Thread
from time import sleep
import json
import os

app = Flask("OpenCV-TakeImg")
app.config["MONGO_URI"] = "mongodb://127.0.0.1:27017/opencv-img-db"
app.config['SECRET_KEY'] = 'lookataryanman'
moment = Moment(app)


vc=cv2.VideoCapture(0)
vc.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
vc.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)

# Bootstrap(app)
# mongo = PyMongo(app)
taken = 0
taken1 = 0
time = 0
gall = []
thing = False
ok = False
go = False
tt = "placehoer"
allowed = False
name = ""

def takePic():
    global go
    global taken
    while go == True:
        rval, frame = vc.read()
        # savePath = 'images/'
        taken = taken +1
        frame = frame[60:660, 240:1040]
        date = datetime.now()
        date = date.strftime("%b %d %Y %I:%M:%S")
        date = str(date)
        date = date.replace(" ", "-")
        date = date.replace(":", "-")
        cv2.imwrite('static/images/'+date+'.jpg',frame)
        sleep(1)
        # session['image'] = 'static/images/image.jpg'


def Start():
    t = Thread(target=takePic)
    t.start()
    return "Processing"

@app.route('/run', methods=['GET']) 
def run():
    global go
    go = True
    Start()
    resp = Response("Application Started")
    resp.headers['Access-Control-Allow-Origin']='*'
    return resp


@app.route('/stop', methods=['GET']) 
def stop():
    global go
    go = False
    resp = Response("Application Stopped")
    resp.headers['Access-Control-Allow-Origin']='*'
    return resp


#---------------------------------------------------------

def generateData(name, ty):
    global allowed
    global taken1
    if not os.path.exists('static/datasets/' + name):
        os.mkdir('static/datasets/' + name)
        os.mkdir('static/datasets/' + name + '/front')
        os.mkdir('static/datasets/' + name + '/turned')
    while allowed == True:
        rval, frame = vc.read()
        taken1 = taken1 +1
        frame = frame[60:660, 240:1040]
        cv2.imwrite('static/datasets/' + name + '/' + ty + '/image'+str(taken1)+'.jpg',frame)


def ThreadTrain(b, name, ty):
    global tt
    if (b == True):
        tt = Thread(target=generateData(name, ty))
        tt.start()
        return "Processing"
    else:
        tt.terminate()
        return "Ended"

@app.route('/train', methods=['POST'])
def train():
    print("HERE")
    rf = request.form
    for x in rf.keys():
        data_dic = json.loads(x)
    name = data_dic['name'].replace(" ", "-")
    global allowed
    allowed = True
    ThreadTrain(True, name, data_dic['type'])
    resp = Response("Train Started")
    resp.headers['Access-Control-Allow-Origin']='*'
    return resp

@app.route('/stoptrain', methods=['POST'])
def tstop():
    global allowed
    allowed = False
    resp = Response("Application Stopped")
    resp.headers['Access-Control-Allow-Origin']='*'
    return resp

if __name__ == '__main__':
   app.run(debug=True)


















# def gen(): 
#    """Video streaming generator function.""" 
#    print('Streamer inititalised')
#    while True:
#         rval, frame = vc.read()
#       #   cv2.Flip(frame, flipMode=-1)
#         byteArray = cv2.imencode('t.jpg', cv2.flip(frame,1))[1].tobytes()
#         yield (b'--frame\r\n'b'Content-Type: image/jpeg\r\n\r\n' + byteArray + b'\r\n')

# @app.route('/take_picture') 
# def take_picture():
#    global taken
#    global thing
#    rval, frame = vc.read()
#    # savePath = 'images/'
#    taken = taken +1
#    cv2.imwrite('static/images/image'+str(taken)+'.jpg',frame)
#    # session['image'] = 'static/images/image.jpg'
#    print("DONE")
#    thing = True
#    return redirect('/')

# @app.route('/gallery') 
# def gallery():
#    global gall
#    ppp = 'static/images/image0.jpg'
#    if (ppp in gall):
#       gall.remove('static/images/image0.jpg')
#    print('THIS IS THE GALL', gall)
#    return render_template('gallery.html', gal=gall)


# @app.route('/video_feed') 
# def video_feed():
#    # cv.Flip(frame, flipMode=-1) 
#    """Video streaming route. Put this in the src attribute of an img tag.""" 
#    return Response(gen(), mimetype='multipart/x-mixed-replace; boundary=frame')

