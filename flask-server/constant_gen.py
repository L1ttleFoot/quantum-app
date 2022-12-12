import sympy as sy
from functools import reduce
from math import factorial
import os

absolute_path = os.path.dirname(__file__)
relative_path = "tmp"
full_path = os.path.join(absolute_path, relative_path)


def factor_k(str):
  return(2**(-len(str)/2))


def factor_fi(str):
  unique = dict(zip(list(str),[factorial(list(str).count(i)) for i in list(str)]))
  return(2**(-len(str)/2)/reduce(lambda a, b : a * b, unique.values()))


def constant_gen(n, omega, const, dipoleX, constType, order):
  print(absolute_path)
  CONST_A_LIST=""
  CONST_n_LIST=""
  CONST_W_LIST=""
  CONST_D_LIST=""
  number_of_vibrational_degrees=len(n)
  max_indignation_step=order
  TYPE_ANGARMONIC_CONST=constType
  f=open(f'{full_path}/const_new.py','w')
  f.write('import sympy as sy\n')
  f.write('\n')

  f.write('number_of_vibrational_degrees=%s'%(number_of_vibrational_degrees) + '\n')
  f.write('max_indignation_step=%s'%(max_indignation_step) + '\n')
  f.write('TYPE_ANGARMONIC_CONST="%s"'%(TYPE_ANGARMONIC_CONST) + '\n')

  n_list={}
  for i in range(len(n)):
    #f.write('n_%s=sy.symbols(''"n_%s"'')'%(n[i]['letIndex'], n[i]['letIndex'])+'\n')
    #n_list[sy.symbols('n_'+str(n[i]['letIndex']))]=int(n[i]['value'])
    f.write('n_%s=sy.symbols(''"n_%s"'')'%(n[i]['letIndex'], n[i]['letIndex'])+'\n')
    n_list[sy.symbols('n_'+str(n[i]['letIndex']))]=0

  omega_list={}
  for i in range(len(omega)):
    f.write('omega_%s=sy.symbols(''"omega_%s"'')'%(omega[i]['letIndex'], omega[i]['letIndex'])+'\n')
    omega_list[sy.symbols('omega_'+str(omega[i]['letIndex']))]=float(omega[i]['value'])

  const_list={}
  for i in range(len(const)):
    f.write('A_%s=sy.symbols(''"A_%s"'')'%(const[i]['letIndex'], const[i]['letIndex'])+'\n')
    const_list[sy.symbols('A_'+str(const[i]['letIndex']))]=float(const[i]['value'])

  const_changed=[*const]
  if constType == 'A':
    const_changed=[*const]
  elif constType == 'k':
    list(map(lambda x: x.update(value=float(x['value'])*factor_k(x['letIndex'])), const_changed))
  elif constType == 'fi':
    list(map(lambda x: x.update(value=float(x['value'])*factor_fi(x['letIndex'])), const_changed))

  const_list_changed={}
  for i in range(len(const)):
    const_list_changed[sy.symbols('A_'+str(const[i]['letIndex']))]=float(const[i]['value'])

  dipoleX_list={}
  for i in range(len(dipoleX)):
    f.write('D_%s=sy.symbols(''"D_%s"'')'%(dipoleX[i]['letIndex'], dipoleX[i]['letIndex'])+'\n')
    dipoleX_list[sy.symbols('D_'+str(dipoleX[i]['letIndex']))]=float(dipoleX[i]['value'])

  #D_0=sy.symbols('D_0')
  #f.write('D_0=sy.symbols(''"D_0"'')'+'\n')

  #d_list={D_0:0}

  CONST_n_LIST='const_n_dict=%s'%(n_list)
  CONST_W_LIST='const_omega_dict=%s'%(omega_list)
  CONST_A_LIST='const_anharmonic_dict=%s'%(const_list)
  CONST_D_LIST='const_dipoleX_dict=%s'%(dipoleX_list)

  f.write(CONST_n_LIST+'\n')
  f.write(CONST_W_LIST+'\n')
  f.write(CONST_A_LIST+'\n')
  f.write(CONST_D_LIST+'\n')

  ZAMENA = {**n_list, **omega_list, **const_list_changed}
  ZAMENA_DX = {dipoleX_list}

  f.write("ZAMENA=%s"%(ZAMENA))
  f.write("ZAMENA_DX=%s"%(ZAMENA_DX))
  f.close()
  return