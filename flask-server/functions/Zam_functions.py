#!/usr/bin/python
# -*- coding: utf-8 -*- # необходима для ввода коментариев на русском
import numpy as np
from const import *
###################### Создал функцию замены n_i на n_i+k   ################

def ZAM(XXX,k):
  Z1=np.array(list(const_n_dikt.keys()))
  Z2=np.array(list(const_n_dikt.keys()))+np.array(list(k))
  return XXX.subs([(Z1[i],Z2[i]) for i in range(len(k))])

def ZAM_ZAM(VEC,k):
    Z1=np.array(list(const_n_dikt.keys()))
    Z2=np.array(list(const_n_dikt.keys()))+np.array(list(k))
    def zam(vec):
        if isinstance(vec[1], int): return [tuple(np.array((vec[0]))+np.array(k)), vec[1]]
        else: return [tuple(np.array((vec[0]))+np.array(k)), vec[1].subs([(Z1[i],Z2[i]) for i in range(len(k))])]
    return list(map(zam,VEC))