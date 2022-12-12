import sympy as sy
from functools import reduce
from math import factorial
import copy

def factor_k(str):
  return(2**(-len(str)/2))

def factor_fi(str):
  unique = dict(zip(list(str),[factorial(list(str).count(i)) for i in list(str)]))
  return(2**(-len(str)/2)/reduce(lambda a, b : a * b, unique.values()))

def dict_gen(n, omega, const, dipoleX, constType):

  n_list = {}
  for i in range(len(n)):
    #n_list[sy.symbols('n_'+str(n[i]['letIndex']))]=int(n[i]['value'])
    n_list[sy.symbols('n_'+str(n[i]['letIndex']))] = 0

  omega_list = {}
  for i in range(len(omega)):
    omega_list[sy.symbols('omega_'+str(omega[i]['letIndex']))] = float(omega[i]['value'])

  const_changed = copy.deepcopy(const)
  if constType=='k':
    list(map(lambda x: x.update(value=float(x['value'])*factor_k(x['letIndex'])),const_changed))
  elif constType=='fi':
    list(map(lambda x: x.update(value=float(x['value'])*factor_fi(x['letIndex'])),const_changed))

  const_list_changed = {}
  for i in range(len(const_changed)):
    const_list_changed[sy.symbols('A_'+str(const_changed[i]['letIndex']))] = float(const_changed[i]['value'])

  dipoleX_list = {}
  for i in range(len(dipoleX)):
    dipoleX_list[sy.symbols('D_'+str(dipoleX[i]['letIndex']))] = float(dipoleX[i]['value'])

  #D_0 = sy.symbols('D_0')

  #d_list = {D_0: 0}

  complete_dict = {**n_list, **omega_list, **const_list_changed}
  
  return complete_dict