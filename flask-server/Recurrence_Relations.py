#!/usr/bin/python
# -*- coding: utf-8 -*- # необходима для ввода коментариев на русском

#from MAKE_DB import *
from collections import namedtuple

from apendix import *
from sympy import sqrt, prod, Rational, diff, factorial
import sympy as sy
from itertools import product
from db_functions import getEnergy, insertEnergy, getVector, insertVector, getDipole, insertDipole, getPolynomial, insertPolynomial
from MAKE_DB import *

import numpy as np
#from const_new import *
###################### Создал функцию замены n_i на n_i+k   ################


def ZAM(XXX, k, n_dict):
    Z1 = np.array((n_dict))
    Z2 = np.array((n_dict))+np.array(list(k))
    return XXX.subs([(Z1[i], Z2[i]) for i in range(len(k))])


def ZAM_ZAM(VEC, k, n_dict):
    Z1 = np.array((n_dict))
    Z2 = np.array((n_dict))+np.array(list(k))

    def zam(vec):
        if isinstance(vec[1], int):
            return [tuple(np.array((vec[0]))+np.array(k)), vec[1]]
        else:
            return [tuple(np.array((vec[0]))+np.array(k)), vec[1].subs([(Z1[i], Z2[i]) for i in range(len(k))])]
    return list(map(zam, VEC))


#################библиотеки##############################


#######################################

# Сначала заведем класс Vector(n) - это объект содержащий в себе иформацию
# о неком невозмущенном векторе n, а именно:
# информацию о числах заполнения self._vec - характеризующих энергетическое состояние (n_1,n_2,...);
# информацию о постоянных множителях self._const - ангармонические постоянные, производные функции дипольного момента;
# информацию о числовых множителях self._NF возникших в результате воздействия на вектор операторов рождения и уничтожения;
# В общем это объект обладающий свойствами бра или кет вектора описывающего состояние системы в энергетическом представлении.
# В этот объект встроены функции которые могут вызвать информацию хранящююся внутри этого объекта: vec(self), NF(self), const(self)
# const=reload(const)

n_i=sy.symbols("n_i")

n_j=sy.symbols("n_j")

n_k=sy.symbols("n_k")

const_n_dict={n_i: 'n_i', n_j: 'n_j', n_k: 'n_k'}

class Vector():
    def __init__(self, vec, Const=1):
        self._vec = np.array(list(const_n_dict.keys()))+np.array(list(vec))
        #self._vec = np.array(list(vec))
        self._NF = []
        self._const = [Const]

    def vec(self):
        return tuple(self._vec-np.array(list(const_n_dict.keys())))
        #return tuple(self._vec)

    def NF(self):
        return prod(self._NF)

    def const(self):
        return prod(self._const)


# Теперь необходимо создать функции описывающие работу операторов рождения born(vec,i) и  уничтожения dead(vec,i)
# в качестве аргументов функция принимает объект класса Vector(), в данном случае обозначенный как vec, и индекс числа в векторе состояния
# на которое нужно подействовать
# врезультате этого воздействия объект vec притерпевает изменение, а именно:
# число заполнения n_i увеличивается/уменьшается на единицу при воздействии оператора рождения/уничтожения
# одновременно с этим записывается числовой множитель n_i+1 при воздействии оператора рождения или n_i при воздействии оператора уничтожения в список self._NF

def dead(vec, i):
    ''' Оператор уничтожения '''
   # i=-1 # добавил так как в VECTOR_INDEX добавил 0
    vec._NF.append(sqrt(vec._vec[i]))
    vec._vec[i] -= 1


def born(vec, i):
    ''' Оператор уничтожения '''
   # i=-1 # добавил так как в VECTOR_INDEX добавил 0
    vec._vec[i] += 1
    vec._NF.append(sqrt(vec._vec[i]))

# Так возмущения в теории полиномов квантовых чисел представлены в виде разложения в ряд по степеням нормальных координат q,
# нам необходимо завести функцию ksi^n где ksi=(dead,born) - более удобная вибрационная переменная равная q*sqrt(2),
# n - степень в которую нужно возвести ksi


def ksi_polinom(n: int) -> list:
    ''' Разложение ksi()^j в полином  '''
    ksi = [dead, born]
    # декартово произведение [[z,y,x] for x in a for y in a for z in a ]
    return [x[::-1] for x in product(ksi, repeat=n)]


#KEY_key=dict([(i.name,i) for i in list(const_anharmonic_dict.keys())+list(const_dipol_dict.keys())+list(const_omega_dict.keys())])
# Расчет G|KET> где G=G(p)
#########################


def G_KET(KET: list, fksi: list, IJK: list, key_dict, Factor='A'):
    '''Factor может принимать три значения 
    A - будет умножение на ангармонические постоянные, 
    D -будет умножение на произмодные дипольного момента, 
    omega -будет умножение гармонические частоты с множителем 1/2'''
    def apply(ket):
        RESULT = []
        for ijk in IJK:
            if Factor != 'omega':
                A = key_dict[f'{Factor}_{ijk}']
            else:
                if ijk[0] != ijk[1]: continue
                A = key_dict[f'{Factor}_{ijk[0]}']/2
            ijk_ind = [VECTOR_INDEX_MAP[x] - 1 for x in ijk]
            result = [Vector(ket[0], ket[1] * A) for i in range(len(fksi))]
            for vec, operations in zip(result, fksi):
                for op, i in zip(operations, ijk_ind):
                    op(vec, i)
            RESULT += result
        return RESULT
    C = []
    for i in map(apply, KET): C += i
    return C
###########################
# Расчет <bra|G|ket>, где G|ket> расчитывается с помощью функции G_KET


def BRA_G_ket(bra, G_ket):
    def apply(x):
        if bra[0] == x.vec():
            return prod([x.NF(), x.const(), bra[1]])
        else:
            return 0
    return sum(list(map(apply, G_ket)))
#    return  list(map(apply,G_ket))

# def SIMPLY_vec(VEC):
#     def apply(x):
#         return [x[0],sy.simplify(x[1])]
#     return list(map(apply,VEC))

##################################################


# создадим базы данных для векторов BD_V  и энергий BD_E
#create_VECTOR_BD(BD_V)
#create_ENERGY_BD(BD_E)

##################################################

# Теперь когда мы задали базовые функции описывающие вектор состояния, операторы рождения и уничтожения,
# а также операцию вычисления матричного элемента состоящего из невозмущенных векторов мы можем перейти п программираванию
# основных рекурентных уравнений теории полиномов квантовых чисел (*),(**).
# А именно уравнениий (*)для расчета проправки к энергии E(n,alfa) и (**) поправки к вектору состояния системы |n,alfa>,
# где n - вектор состояния (n__1,n__2,...),  alfa - степень возмущения.

# В выражениях (*),(**) для расчета проправки к энергии E(n,alfa) и поправки к вектору состояния системы |n,alfa> введен особое правило суммирования
# (p,betta,gamma)alfa для поправки к энергии и (p,q,betta,gamma,nu)alfa для поправки к вектору состояния, которое говорит что сумма элементов внутри
# скобок должна равняться значению alfa. Поэтому для большего удобства работы с индексами p,q,betta,.. и т.д. мы заведем именнованные кортежи
# Index и Index2

create_VECTOR_BD(BD_V)
create_ENERGY_BD(BD_E)
create_dipol_BD(BD_D)
create_polinom_BD(BD_P)

Index = namedtuple('Index', 'p q betta gamma nu')
Index2 = namedtuple('Index2', 'p betta gamma')
Index3 = namedtuple('Index3', 'p alfa')

#расчет поправки к вектору состояния#
# calculation Amendment to the Vector (AV)


def AV(ket, ind, n_dict, key_dict):
    print('AV', 'ket:', ket, 'ind:', ind)
    AAA = [0 for i in range(len(ket))]
    aaa = tuple(AAA)
    N = select_vector(BD_V, (aaa, ind))
    #N = getVector(aaa, ind)
    if N:
        if list(ket) == AAA:
            return N
        else:
            return ZAM_ZAM(N, ket, n_dict)
    else:
        if ind == 0:
            #insert_vector(BD_V,(aaa,0,[[aaa,1]]))
            return [[tuple(ket), 1]]
        else:
            N = []
            # (p,q,бетта,гамма,ню)
            for i in [Index(*i) for i in product(range(0, ind + 1), repeat=5) if sum(i) == ind and i[1] % 2 == 0 and i[0] > 0]:
                KET = AV(AAA, i.gamma, n_dict, key_dict)
                M_BRA = AV(AAA, i.betta, n_dict, key_dict)
                M_KET = AV(AAA, i.nu, n_dict, key_dict)
                fksi = ksi_polinom(i.p + 2)
                NF1 = Rational(i.p/ind)
                G_ket = G_KET(KET, fksi, INDEX(i.p, len(n_dict)), key_dict)
                for bra in VECTORS_m(3 * (i.betta + i.gamma) + i.p + 2, AAA, len(n_dict)):
                    if list(bra) == list(AAA): continue
                    if pravilo_otbora(bra, AAA, i.p + 2, i.betta, i.gamma) == 0: continue
                    DELTA = delta(AAA, bra, i.q, n_dict, key_dict)
                    if DELTA == 0: continue  # В этом месте буду изменять для вырожденного случая
                    NF2 = sum(list(map(lambda vec: BRA_G_ket(vec, G_ket), ZAM_ZAM(M_BRA, bra, n_dict))))
                    if NF2 == 0: continue
                    N += list(map(lambda V: [V[0], prod([NF1, NF2, V[1], DELTA])], ZAM_ZAM(M_KET, bra, n_dict)))
                N = DEL(N)
            insert_vector(BD_V, (aaa, ind, N))
            #insertVector(aaa, ind, N)
            if list(ket) == AAA: return N
            N = ZAM_ZAM(N, ket, n_dict)
            return N

# Функция упрощает полученый вектор, суммируя множители при одинаковых векторах
# |n,alfa>=[...]: [A|n_i+1>,B|n_i-1>,-C|n_i+1>,D|n_i-1>]== [(A-C)|n_i+1>,(D+B)|n_i-1>]


def DEL(p: list):
    key = []
    for i in p:
        I = i[0]
        if not I in key: key.append(I)
    P = dict.fromkeys(key)
    for j in key:
        A = []
        for i in p:
            if i[0] == j:
                A.append(i[1])
        P[j] = sy.sympify(sum(A), rational=True)
    return [list(i) for i in list(P.items())]

    # Расчет поправки к энергии
    # calculation Amendment to the Energy (AE)


def AE(vec1, vec2, ind, n_dict, key_dict):
    print('AE', 'vec1:', vec1, 'vec2:', vec2, 'ind:', ind)
    if ind == 0:
        if vec1 != vec2: return 0
        fksi = ksi_polinom(2)
        G_ket = G_KET(AV(vec1, 0, n_dict, key_dict), fksi, INDEX(0, len(n_dict)), key_dict, 'omega')
        return sum([BRA_G_ket(bra, G_ket) for bra in AV(vec1, 0, n_dict, key_dict)])
    else:
        N = select_energy(BD_E, (tuple(vec1), tuple(vec2), ind))
        #N = getEnergy(tuple(vec1),tuple(vec2),ind)
        #N = None
        if N or N == 0:
            return N
        else:
             ########### Пытаюсь ускорить за счет авто замены
            vec_0 = np.array([0 for i in vec1])
            vec_start = np.array(vec2)
            vec_z1 = list(np.array(vec1) - vec_start)

            N = select_energy(BD_E, (tuple(vec_0), tuple(vec_z1), ind))
            if N == 0:
                return N
            elif N:
                return N.subs(const_n_dict)
            else:
                vec_start = np.array(vec1)
                vec_z1 = list(np.array(vec2) - vec_start)
                N = select_energy(BD_E, (tuple(vec_0), tuple(vec_z1), ind))
                if N == 0:
                    return N
                elif N:
                    return N.subs(const_n_dict)
                else:
                    N = []
                    for i in reversed(
                            [Index2(*i) for i in product(range(0, ind + 1), repeat=3) if sum(i) == ind and i[0] > 0]):
                        if pravilo_otbora(vec_0, vec_z1, i.p + 2, i.betta, i.gamma) == 0: continue
                        KET = AV(vec_z1, i.gamma, n_dict, key_dict)
                        BRA = AV(vec_0, i.betta, n_dict, key_dict)
                        if i.gamma > i.betta: KET, BRA = BRA, KET
                        fksi = ksi_polinom(i.p + 2)
                        NF1 = Rational(i.p / ind)
                        G_ket = G_KET(KET, fksi, INDEX(i.p, len(n_dict)), key_dict)
                        E = sum([BRA_G_ket(vec, G_ket) for vec in BRA])
                        N.append(prod([NF1, E]))
                    N = sum(N)
                    insert_energy(BD_E, (tuple(vec_0), tuple(vec_z1), ind, N))
                    if N == 0:
                        return N
                    else:
                        return N.subs(const_n_dict)
            """ N = []
            for i in reversed([Index2(*i) for i in product(range(0, ind+1), repeat=3) if sum(i) == ind and i[0] > 0]):
                if pravilo_otbora(vec1, vec2, i.p+2, i.betta, i.gamma) == 0:
                    continue
                KET = AV(vec2, i.gamma, n_dict, key_dict)
                BRA = AV(vec1, i.betta, n_dict, key_dict)
                if i.gamma > i.betta:
                    KET, BRA = BRA, KET
                fksi = ksi_polinom(i.p+2)
                NF1 = Rational(i.p/ind)
                G_ket = G_KET(KET, fksi, INDEX(i.p, len(n_dict)), key_dict)
                E = sum([BRA_G_ket(vec, G_ket) for vec in BRA])
                N.append(prod([NF1, E]))
            N = sum(N)
            insert_energy(BD_E, (tuple(vec1), tuple(vec2), ind, N))
            #insertEnergy(tuple(vec1), tuple(vec2), ind, N)
            return N """

####################################################################
# Вытаскиваем значение Э


def AE_BD(vec1, vec2, ind, n_dict, key_dict):
    print('AE_BD', 'vec1:', vec1, 'vec2:', vec2, 'ind:', ind)
    '''Расчитывает поправку к энергии'''
    if ind == 0:
        return AE(vec1, vec2, ind, n_dict, key_dict)
    elif ind % 2 == 1 and vec1 == vec2:
        return 0
    elif ind % 2 == 0 and vec1 == vec2:
        AAA = [0 for i in range(len(vec1))]
        aaa = tuple(AAA)
        N = select_energy(BD_E, (aaa, aaa, ind))
        #N = getEnergy(aaa, aaa, ind)
        #N = None
        if N == 0: return N
        if N:
            if vec1 == AAA:
                return N
            else:
                return ZAM(N, vec1, n_dict)
        if N == None:
            N = AE(AAA, AAA, ind, n_dict, key_dict)
            return ZAM(N, vec1, n_dict)
    else:
        #N = getEnergy(tuple(vec1), tuple(vec2), ind)
        N = select_energy(BD_E, (tuple(vec1), tuple(vec2), ind))
        if N:
            return N
        else:
            return AE(vec1, vec2, ind, n_dict, key_dict)


def pravilo_otbora(bra, ket, nksi, alfa, betta):
    k = sum(bra) - sum(ket)
    return 0 if (alfa + betta + nksi) % 2 != k % 2 else 1


def delta(n, m, q, n_dict, key_dict):
    Em = []
    En = []
    lamda = []
    E_dict = {}
    for i in range(q + 1):
        if i % 2 == 1:
            E_dict[f'Em_{i}'] = 0
            E_dict[f'En_{i}'] = 0
        if i % 2 == 0:
            E_dict[f'Em_{i}'] = AE_BD(m, m, i, n_dict, key_dict)
            E_dict[f'En_{i}'] = AE_BD(n, n, i, n_dict, key_dict)
        Em.append(eval(f'sy.symbols("Em_{i}")'))
        En.append(eval(f'sy.symbols("En_{i}")'))
        lamda.append(eval(f'sy.symbols("L")')**i)
    Em = sum([lamda[i] * Em[i] for i in range(q + 1)])
    En = sum([lamda[i] * En[i] for i in range(q + 1)])
    Zamena = list(E_dict.items())
    S = 1/(En-Em)
    i = 0
    while i < q:
        S = diff(S, 'L')
        i += 1
    S = S.subs('L', 0) / factorial(q)
    S = sy.simplify(S)
    return S.subs(Zamena)

# расчет матричного элемента функции дипольного момента
# calculation the Matrix Element of the Dipole Moment Function (MEDMF)


def MEDMF(bra, ket, max_indignation_step, n_dict, key_dict):
    print('MEDMF', 'bra:', bra, 'ket:', ket)
    result = []
    for i in reversed([Index2(*i) for i in product(range(0, max_indignation_step+1), repeat=3) if sum(i[1:]) < max_indignation_step]):
        if pravilo_otbora(bra, ket, i.p+2, i.betta, i.gamma) == 0:
            continue
        KET = AV(ket, i.betta, n_dict, key_dict)
        BRA = AV(bra, i.gamma, n_dict, key_dict)
        fksi = ksi_polinom(i.p)
        IJK = INDEX(i.p-2, len(n_dict))
        GKET = G_KET(KET, fksi, IJK, key_dict, 'D')
        BGK = sum([BRA_G_ket(vec, GKET) for vec in BRA])
        result.append(sy.simplify(BGK))
    return sy.simplify(sum(result))

def MEDMF_BD(bra, ket, max_indignation_step, n_dict, key_dict):
    print('MEDMF_BD', 'bra:', bra, 'ket:', ket)
    def medmf_bd(bra, ket, max_indignation_step, n_dict, key_dict):
        D = select_dipol(BD_D, (tuple(bra), tuple(ket), max_indignation_step))
        #D = getDipole(tuple(bra), tuple(ket), max_indignation_step)
        #D = None
        if D or D == 0:
            return D
        else:
            D = 0
            for i in reversed([Index3(*i) for i in product(range(0, max_indignation_step + 2), repeat = 2) if
                               sum(i[1:]) < max_indignation_step + 1]):
                N = select_polinom(BD_P, (tuple(bra), tuple(ket), i.p, i.alfa))
                #N = getPolynomial(tuple(bra), tuple(ket), i.p, i.alfa)
                #N = None
                if N:
                    D += N  
                else:
                    D += Polinom(bra, ket, i.p, i.alfa, n_dict, key_dict, 'D')
            #insertDipole(tuple(bra), tuple(ket), max_indignation_step, D)
            insert_dipol(BD_D,(tuple(bra),tuple(ket),max_indignation_step,D))
            return D
    Z = bra
    if Z != [0 for i in bra]:
        ket = list(np.array(ket) - np.array(bra))
        bra = [0 for i in bra]
    D = medmf_bd(bra, ket, max_indignation_step, n_dict, key_dict)
    if D != 0:
        return ZAM(D, Z, n_dict)
    else:
        return D

def Polinom(bra, ket, p, alfa, n_dict, key_dict, Factor):
    print('Polinom', 'bra:', bra, 'ket:', ket)
    #N = getPolynomial(tuple(bra), tuple(ket), p, alfa)
    N = select_polinom(BD_P, (tuple(bra), tuple(ket), p, alfa))
    #N = None
    if N:
        return N
    else:
        result = []
        for i in product(range(0, alfa + 1), repeat = 2):
            if pravilo_otbora(bra, ket, p, i[0], i[1]) == 0: continue
            if sum(i) == alfa:
                BRA = AV(bra, i[0], n_dict, key_dict)
                KET = AV(ket, i[1], n_dict, key_dict)
                fksi = ksi_polinom(p)
                IJK = INDEX(p - 2, len(n_dict))
                GKET = G_KET(KET, fksi, IJK, key_dict, Factor)
                BGK = sum([BRA_G_ket(vec, GKET) for vec in BRA])
                result.append(BGK)
        N = sum(result)
        if N == None: N = 0
        #insertPolynomial(tuple(bra), tuple(ket), p, alfa, N)
        insert_polinom(BD_P, (tuple(bra), tuple(ket), p, alfa, N))
        return N

def Resonance(levels, zamena, max_indignation_step, n_dict, key_dict):
    vec = [0 for i in levels[0]]
    dimensions = len(levels)
    E0 = [AE_BD(vec, vec, k, n_dict, key_dict) for k in range(max_indignation_step + 1)]
    E0 = sum([i.subs(zamena) for i in E0 if i != 0])
    matrixbase = []
    matrixrow = []
    j = 0
    for i in product(levels, repeat=2):
        if j == dimensions:
            matrixbase.append(list(matrixrow))
            matrixrow = []
            j = 0
        AA = [AE_BD(i[0], i[1], k, n_dict, key_dict) for k in range(max_indignation_step + 1)]
        AA1 = [k.subs(zamena) for k in AA if k != 0]
        matrixrow.append(sum(AA1))
        j += 1

    matrixbase.append(list(matrixrow))
    M = sy.Matrix(matrixbase)
    E = sy.eye(dimensions)*E0
    M = M-E
    D = list(M.eigenvals().keys())
    M = np.array(M)
    M = [M[i][i] for i in range(len(levels))]

    def SORT(D,M):
        s=[0 for i in M]
        for i in range(len(M)):
            for j in D:
                if sqrt((M[i]-j)**2)<sqrt((M[i]-s[i])**2): s[i]=j
        return s
    S=dict(zip([tuple(i) for i in levels],SORT(D,M)))
    # S=SORT(D,m,levels)
    return S
