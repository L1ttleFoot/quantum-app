
#!/usr/bin/python
# -*- coding: utf-8 -*- # необходима для ввода коментариев на русском

##################################################
    # DATABASE #

import sqlite3
import pickle

protocol = 0
sqlite3.register_converter("pickle", pickle.loads)
#sqlite3.register_adapter(list, pickle.dumps)
sqlite3.register_adapter(tuple, pickle.dumps)
#sqlite3.register_adapter(str, pickle.dumps)


################################
table_name_Energy    = "Energy"
insert_string_Energy = "INSERT into %s values (?, ?, ?, ?)" % (table_name_Energy)
select_string_Energy = "SELECT energy FROM %s WHERE bra=? and ket=? and ind=?" % (table_name_Energy)

def create_ENERGY_BD(cursor):
    try:
        cursor.execute("""
            CREATE TABLE %s (
                bra pickle not null,
                ket pickle not null,
                ind integer not null,
                energy BLOB not null,
                PRIMARY KEY (bra, ket, ind)
                )""" % (table_name_Energy))
    except sqlite3.OperationalError:
        pass

def insert_energy(cursor, params):
    try:
        #cursor.execute(insert_string_Energy,params)
        vec1=params[0]
        vec2=params[1]
        ind=params[2]
        N=pickle.dumps( params[3] , protocol = None , fix_imports = True)# , buffer_callback = None )
        cursor.execute(insert_string_Energy,(vec1,vec2,ind,N))
    except sqlite3.IntegrityError:
        print("Duplicate key")
        print(vec1,vec2,ind, ' ошибка тут')
    conn_energy.commit()

def select_energy(cursor, params):
    cursor.execute(select_string_Energy, (params))
    data = cursor.fetchone()
    if data==None:return data
    else:return  pickle.loads( data[0] , fix_imports = True , encoding = "ASCII" , errors = "strict")# , buffers = None )

conn_energy = sqlite3.connect('energy.db', detect_types=sqlite3.PARSE_DECLTYPES, check_same_thread=False)
BD_E = conn_energy.cursor()

######################################

table_name = "vectors"
insert_string_vector = "INSERT into %s values (?, ?, ?)" % (table_name)
select_string_vector = "SELECT vector FROM %s WHERE ket=? and ind=?" % (table_name)
def create_VECTOR_BD(cursor):
    try:
        cursor.execute("""
            CREATE TABLE %s (
                ket pickle not null,
                ind integer not null,
                vector BLOB not null,
                PRIMARY KEY (ket, ind)
                )""" % (table_name))
    except sqlite3.OperationalError:
        pass

def insert_vector(cursor, params):
    try:
        vec=params[0]
        ind=params[1]
        N=pickle.dumps( params[2] , protocol = None , fix_imports = True )#, buffer_callback = None )
        cursor.execute(insert_string_vector,(vec,ind,N))
    except sqlite3.IntegrityError:
        print("Duplicate key")
    conn_vector.commit()

def select_vector(cursor, params):
    cursor.execute(select_string_vector, (params))
    data = cursor.fetchone()
    if data==None:return data
    return  pickle.loads( data[0] , fix_imports = True , encoding = "ASCII" , errors = "strict" )#, buffers = None )

##
conn_vector = sqlite3.connect('vectors.db', detect_types=sqlite3.PARSE_DECLTYPES, check_same_thread=False)
BD_V = conn_vector.cursor()
#####################################################################

table_name_dipol = "dipols"
insert_string_dipol = "INSERT into %s values (?, ?, ?, ?)" % (table_name_dipol)
select_string_dipol = "SELECT dipol FROM %s WHERE bra=? and ket=? and ind=?" % (table_name_dipol)

def create_dipol_BD(cursor):
    try:
        cursor.execute("""
            CREATE TABLE %s (
                bra pickle not null,
                ket pickle not null,
                ind integer not null,
                dipol BLOB not null,
                PRIMARY KEY (bra, ket, ind)
                )""" % (table_name_dipol))
    except sqlite3.OperationalError:
        pass

def insert_dipol(cursor, params):
    try:
        vec1=params[0]
        vec2=params[1]
        ind=params[2]
        N=pickle.dumps( params[3] , protocol = None , fix_imports = True)# , buffer_callback = None )
        cursor.execute(insert_string_dipol,(vec1,vec2,ind,N))
    except sqlite3.IntegrityError:
        print("Duplicate key")
        print(vec1,vec2,ind, ' ошибка тут')
        
    conn_dipol.commit()

def select_dipol(cursor, params):
    cursor.execute(select_string_dipol, (params))
    data = cursor.fetchone()
    if data==None:return data
    else:return  pickle.loads( data[0] , fix_imports = True , encoding = "ASCII" , errors = "strict")# , buffers = None )

conn_dipol = sqlite3.connect('dipol.db', detect_types=sqlite3.PARSE_DECLTYPES, check_same_thread=False)
BD_D = conn_dipol.cursor()

#####################################################################

table_name_polinom    = "polinom"
insert_string_polinom = "INSERT into %s values (?, ?, ?, ?, ?)" % (table_name_polinom)
select_string_polinom = "SELECT polinom FROM %s WHERE bra=? and ket=? and p=? and alfa=?" % (table_name_polinom)

def create_polinom_BD(cursor):
    try:
        cursor.execute("""
            CREATE TABLE %s (
                bra pickle not null,
                ket pickle not null,
                p integer not null,
                alfa integer not null,
                polinom BLOB not null,
                PRIMARY KEY (bra, ket, p, alfa)
                )""" % (table_name_polinom))
    except sqlite3.OperationalError:
        pass

def insert_polinom(cursor, params):
    try:
        vec1=params[0]
        vec2=params[1]
        p=params[2]
        alfa=params[3]
        N=pickle.dumps( params[4] , protocol = None , fix_imports = True)# , buffer_callback = None )
        cursor.execute(insert_string_polinom,(vec1,vec2,p,alfa,N))
    except sqlite3.IntegrityError:
       # print("Duplicate key")
        print(vec1,vec2,p,alfa, ' ошибка тут')
        
    conn_polinom.commit()

def select_polinom(cursor, params):
    cursor.execute(select_string_polinom, (params))
    data = cursor.fetchone()
    if data==None:return data
    else:return  pickle.loads( data[0] , fix_imports = True , encoding = "ASCII" , errors = "strict")# , buffers = None )

conn_polinom = sqlite3.connect('polinom.db', detect_types=sqlite3.PARSE_DECLTYPES, check_same_thread=False)
BD_P = conn_polinom.cursor()