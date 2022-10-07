from itertools import product, combinations_with_replacement
import numpy as np
import sympy as sy

VECTOR_INDEX = '0ijklxyzopqvcasdfghtremn' # список возможных индексов
VECTOR_INDEX_MAP = {k:i for i,k in enumerate(VECTOR_INDEX)} # словарь индексов

def INDEX(n:int, number_of_vibrational_degrees)->list:
    ''' Индексы вектора vec, степени возмущения n, vec дб tuple для хэширования '''
    if n==-2:return [('0')] # добавил так как в VECTOR_INDEX добавил 0
    
    return [''.join(i) for i in combinations_with_replacement(VECTOR_INDEX[1:number_of_vibrational_degrees+1], n+2) ]    

def VECTORS_m(n:int, vec, number_of_vibrational_degrees):
  '''генерирует список с возможными значениями k для вектора m_i=n_i+k_i, k_i принимает значение [-n:n] и сумма модулей k_i   меньше или равна n
  пример: element_index(1,(0,0))== [(-1, 0), (0, -1), (0, 0), (0, 1), (1, 0)]'''
  ''' Индексы элементов к которым будут применяться операторы '''
 # rng = range(-n,n+1)
  el = [i for i in product(range(-n,n+1), repeat=number_of_vibrational_degrees) if sum(map(abs,i)) <=n]
  el = np.array(el) + vec
  return list(map(tuple,el))

def constant_gen(n, omega, const, constType):
  CONST_A_LIST=""
  CONST_n_LIST=""
  CONST_W_LIST=""
  CONST_D_LIST=""
  number_of_vibrational_degrees=len(n)
  max_indignation_step=2
  TYPE_ANGARMONIC_CONST=constType
  f=open(f'const_new.py','w')
  f.write('import sympy as sy\n')
  f.write('\n')


  f.write('number_of_vibrational_degrees=%s'%(number_of_vibrational_degrees) + '\n')
  f.write('max_indignation_step=%s'%(max_indignation_step) + '\n')
  f.write('TYPE_ANGARMONIC_CONST="%s"'%(TYPE_ANGARMONIC_CONST) + '\n')

  n_list={}
  for i in range(len(n)):
    f.write('n_%s=sy.symbols(''"n_%s"'')'%(n[i]['letIndex'], n[i]['letIndex'])+'\n')
    n_list[sy.symbols('n_'+str(n[i]['letIndex']))]=int(n[i]['value'])

  omega_list={}
  for i in range(len(omega)):
    f.write('omega_%s=sy.symbols(''"omega_%s"'')'%(omega[i]['letIndex'], omega[i]['letIndex'])+'\n')
    omega_list[sy.symbols('omega_'+str(omega[i]['letIndex']))]=float(omega[i]['value'])

  const_list={}
  for i in range(len(const)):
    f.write('A_%s=sy.symbols(''"A_%s"'')'%(const[i]['letIndex'], const[i]['letIndex'])+'\n')
    const_list[sy.symbols('A_'+str(const[i]['letIndex']))]=float(const[i]['value'])

  D_0=sy.symbols('D_0')
  f.write('D_0=sy.symbols(''"D_0"'')'+'\n')

  d_list={D_0:0}
  
  CONST_n_LIST='const_n_dict=%s'%(n_list)
  CONST_W_LIST='const_omega_dict=%s'%(omega_list)
  CONST_A_LIST='const_angarmonik_dict=%s'%(const_list)
  CONST_D_LIST='const_dipol_dict=%s'%(d_list)
  
  f.write(CONST_n_LIST+'\n')
  f.write(CONST_W_LIST+'\n')
  f.write(CONST_A_LIST+'\n')
  f.write(CONST_D_LIST+'\n')
  
  f.write("ZAMENA={**const_n_dict, **const_omega_dict, **const_angarmonik_dict, **const_dipol_dict}\n")
  f.close()
  return