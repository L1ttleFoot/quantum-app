
import json
import pickle
from firebase_admin import db

def getVector(ket, ind):

    #print('here Vector')

    if(db.reference("/").get()==None):
        return None

    ref = db.reference("/Vector")

    vector = ref.get()

    if(vector==None):
        return None

    if(vector==''):
        return None

    for key, value in vector.items():
        if('ket' in value and 'ind' in value and 
            value["ket"] == ''.join(str(x) for x in ket) and 
            value["ind"] == ind):
            #ref.child(key).update({"bra":5})
            return pickle.loads(eval(value['v']))

    return None

def insertVector(ket, ind, v):

    if(db.reference("/").get()==None):
        db.reference("/").update({'Vector':''})

    if(db.reference("/Vector").get()==None):
        db.reference("/").update({'Vector':''})

    ref = db.reference("/Vector")

    vector = ref.get()

    if(vector==None):
        return None

    if(vector==''):
        ref.push().update({'ket':''.join(str(x) for x in ket), 'ind': ind, 'v': str(pickle.dumps(v))})
        return

    for key, value in vector.items():
        if('ket' in value and 'ind' in value and 
            value["ket"] == ''.join(str(x) for x in ket) and 
            value["ind"] == ind):
            #ref.child(key).update({"bra":5})
            break
    else:
        ref.push().update({'ket':''.join(str(x) for x in ket), 'ind': ind, 'v': str(pickle.dumps(v))})

    return

def getEnergy(bra, ket, ind):

    #print('here Energy')

    if(db.reference("/").get()==None):
        return None

    ref = db.reference("/Energy")

    energy = ref.get()

    if(energy==None):
        return None

    if(energy==''):
        return None

    for key, value in energy.items():
        if('bra' in value and 'ket' in value and 'ind' in value and 
            value["bra"] == ''.join(str(x) for x in bra) and 
            value["ket"] == ''.join(str(x) for x in ket) and 
            value["ind"] == ind):
            #ref.child(key).update({"bra":5})
            return pickle.loads(eval(value['e']))

    return None

def insertEnergy(bra, ket, ind, e):

    if(db.reference("/").get()==None):
        db.reference("/").update({'Energy':''})

    if(db.reference("/Energy").get()==None):
        db.reference("/").update({'Energy':''})

    ref = db.reference("/Energy")

    energy = ref.get()

    if(energy==''):
        ref.push().set({'bra': ''.join(str(x) for x in bra),'ket':''.join(str(x) for x in ket), 'ind': ind, 'e': str(pickle.dumps(e))})
        return

    for key, value in energy.items():
        if('bra' in value and 'ket' in value and 'ind' in value and 
            value["bra"] == ''.join(str(x) for x in bra) and 
            value["ket"] == ''.join(str(x) for x in ket) and 
            value["ind"] == ind):
            #ref.child(key).update({"bra":5})
            break
    else:
        ref.push().update({'bra': ''.join(str(x) for x in bra),'ket':''.join(str(x) for x in ket), 'ind': ind, 'e': str(pickle.dumps(e))})

    return