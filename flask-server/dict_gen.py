import sympy as sy
from functools import reduce
from math import factorial
import copy

def factor_k(str):
  return(2**(-len(str)/2))

def factor_fi(str):
  unique = dict(zip(list(str),[factorial(list(str).count(i)) for i in list(str)]))
  return(2**(-len(str)/2)/reduce(lambda a, b : a * b, unique.values()))

def dict_gen(n, omega, const, constType, dipoleX):

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
    dipoleX_list[sy.symbols('D_'+str(dipoleX[i]['letIndex']))] = 0

  complete_dict = {**n_list, **omega_list, **const_list_changed, **dipoleX_list}
  
  return complete_dict

def dict_dipole_x_gen(dipoleX):

  dipoleX_list = {}
  for i in range(len(dipoleX)):
    dipoleX_list[sy.symbols('D_'+str(dipoleX[i]['letIndex']))] = float(dipoleX[i]['value'])

  dipoleX_changed = copy.deepcopy(dipoleX)
  list(map(lambda x: x.update(value=float(x['value'])*factor_fi(x['letIndex'])),dipoleX_changed))

  dipoleX_list_changed = {}
  for i in range(len(dipoleX_changed)):
    dipoleX_list_changed[sy.symbols('D_'+str(dipoleX_changed[i]['letIndex']))] = float(dipoleX_changed[i]['value'])

  dict_dipole_x_gen = {**dipoleX_list_changed}
  
  return dict_dipole_x_gen

def dict_dipole_y_gen(dipoleY):

  dipoleY_list = {}
  for i in range(len(dipoleY)):
    dipoleY_list[sy.symbols('D_'+str(dipoleY[i]['letIndex']))] = float(dipoleY[i]['value'])

  dipoleY_changed = copy.deepcopy(dipoleY)
  list(map(lambda x: x.update(value=float(x['value'])*factor_fi(x['letIndex'])),dipoleY_changed))

  dipoleY_list_changed = {}
  for i in range(len(dipoleY_changed)):
    dipoleY_list_changed[sy.symbols('D_'+str(dipoleY_changed[i]['letIndex']))] = float(dipoleY_changed[i]['value'])

  dict_dipole_y_gen = {**dipoleY_list_changed}
  
  return dict_dipole_y_gen

def dict_dipole_z_gen(dipoleZ):

  dipoleZ_list = {}
  for i in range(len(dipoleZ)):
    dipoleZ_list[sy.symbols('D_'+str(dipoleZ[i]['letIndex']))] = float(dipoleZ[i]['value'])

  dipoleZ_changed = copy.deepcopy(dipoleZ)
  list(map(lambda x: x.update(value=float(x['value'])*factor_fi(x['letIndex'])),dipoleZ_changed))

  dipoleZ_list_changed = {}
  for i in range(len(dipoleZ_changed)):
    dipoleZ_list_changed[sy.symbols('D_'+str(dipoleZ_changed[i]['letIndex']))] = float(dipoleZ_changed[i]['value'])

  dict_dipole_z_gen = {**dipoleZ_list_changed}
  
  return dict_dipole_z_gen