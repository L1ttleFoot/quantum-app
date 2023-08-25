
import json
import pickle
from firebase_admin import db

def getVector(ket, ind):

    print('here get Vector:', ket, ind)

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

    print('here insert Vector:', ket, ind)

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

    print('here get Energy:', bra, ket, ind)

    if(db.reference("/").get()==None):
        return None

    ref = db.reference("/Energy")

    energy = ref.get()

    if(energy==None):
        return None

    if(energy==''):
        return None

    #(key==f"{''.join(str(x) for x in bra)}{''.join(str(x) for x in ket)}{ind}" альтернативный поиск

    for key, value in energy.items():
        if('bra' in value and 'ket' in value and 'ind' in value and
            value["bra"] == ''.join(str(x) for x in bra) and
            value["ket"] == ''.join(str(x) for x in ket) and
            value["ind"] == ind):
            #ref.child(key).update({"bra":5})
            return pickle.loads(eval(value['e']))

    return None

def insertEnergy(bra, ket, ind, e):

    print('here insert Energy:', bra, ket, ind)

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
        #ref.update({f"{''.join(str(x) for x in bra)}{''.join(str(x) for x in ket)}{ind}":{'bra': ''.join(str(x) for x in bra),'ket':''.join(str(x) for x in ket), 'ind': ind, 'e': str(pickle.dumps(e))}})

    return

def getDipole(bra, ket, ind):

    print('here get Dipole:', bra, ket, ind)

    if(db.reference("/").get()==None):
        return None

    ref = db.reference("/Dipole")

    dipole = ref.get()

    if(dipole==None):
        return None

    if(dipole==''):
        return None

    #(key==f"{''.join(str(x) for x in bra)}{''.join(str(x) for x in ket)}{ind}" альтернативный поиск

    for key, value in dipole.items():
        if('bra' in value and 'ket' in value and 'ind' in value and
            value["bra"] == ''.join(str(x) for x in bra) and
            value["ket"] == ''.join(str(x) for x in ket) and
            value["ind"] == ind):
            #ref.child(key).update({"bra":5})
            return pickle.loads(eval(value['d']))

    return None

def insertDipole(bra, ket, ind, d):

    print('here insert Dipole:', bra, ket, ind)

    if(db.reference("/").get()==None):
        db.reference("/").update({'Dipole':''})

    if(db.reference("/Dipole").get()==None):
        db.reference("/").update({'Dipole':''})

    ref = db.reference("/Dipole")

    dipole = ref.get()

    if(dipole==''):
        ref.push().set({'bra': ''.join(str(x) for x in bra),'ket':''.join(str(x) for x in ket), 'ind': ind, 'd': str(pickle.dumps(d))})
        return

    for key, value in dipole.items():
        if('bra' in value and 'ket' in value and 'ind' in value and
            value["bra"] == ''.join(str(x) for x in bra) and
            value["ket"] == ''.join(str(x) for x in ket) and
            value["ind"] == ind):
            #ref.child(key).update({"bra":5})
            break
    else:
        ref.push().update({'bra': ''.join(str(x) for x in bra),'ket':''.join(str(x) for x in ket), 'ind': ind, 'd': str(pickle.dumps(d))})
        #ref.update({f"{''.join(str(x) for x in bra)}{''.join(str(x) for x in ket)}{ind}":{'bra': ''.join(str(x) for x in bra),'ket':''.join(str(x) for x in ket), 'ind': ind, 'e': str(pickle.dumps(e))}})

    return

def getPolynomial(bra, ket, p, alpha):

    print('here get Polynomial:', bra, ket, p, alpha)

    if(db.reference("/").get()==None):
        return None

    ref = db.reference("/Polynomial")

    polynomial = ref.get()

    if(polynomial==None):
        return None

    if(polynomial==''):
        return None

    #(key==f"{''.join(str(x) for x in bra)}{''.join(str(x) for x in ket)}{ind}" альтернативный поиск

    for key, value in polynomial.items():
        if('bra' in value and 'ket' in value and 'p' in value and 'alpha' in value and
            value["bra"] == ''.join(str(x) for x in bra) and
            value["ket"] == ''.join(str(x) for x in ket) and
            value["p"] == p and
            value["alpha"] == alpha):
            #ref.child(key).update({"bra":5})
            return pickle.loads(eval(value['n']))

    return None

def insertPolynomial(bra, ket, p, alpha, n):

    print('here insert Polynomial:', bra, ket, p, alpha)

    if(db.reference("/").get()==None):
        db.reference("/").update({'Polynomial':''})

    if(db.reference("/Polynomial").get()==None):
        db.reference("/").update({'Polynomial':''})

    ref = db.reference("/Polynomial")

    polynomial = ref.get()

    if(polynomial==''):
        ref.push().set({'bra': ''.join(str(x) for x in bra),'ket':''.join(str(x) for x in ket), 'p': p, 'alpha': alpha, 'n': str(pickle.dumps(n))})
        return

    for key, value in polynomial.items():
        if('bra' in value and 'ket' in value and 'p' in value and 'alpha' in value and
            value["bra"] == ''.join(str(x) for x in bra) and
            value["ket"] == ''.join(str(x) for x in ket) and
            value["p"] == p and
            value["alpha"] == alpha):
            
            #ref.child(key).update({"bra":5})
            break
    else:
        ref.push().update({'bra': ''.join(str(x) for x in bra),'ket':''.join(str(x) for x in ket), 'p': p, 'alpha': alpha, 'n': str(pickle.dumps(n))})
        #ref.update({f"{''.join(str(x) for x in bra)}{''.join(str(x) for x in ket)}{ind}":{'bra': ''.join(str(x) for x in bra),'ket':''.join(str(x) for x in ket), 'ind': ind, 'e': str(pickle.dumps(e))}})

    return