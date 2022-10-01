from itertools import product, combinations_with_replacement
import numpy as np

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

def constant_gen(number_of_vibrational_degrees=4,max_indignation_step=4,TYPE_ANGARMONIC_CONST='A'):
  CONST_A_LIST=""
  CONST_n_LIST=""
  CONST_W_LIST=""
  CONST_D_LIST=""
  f=open(f'const.py','w')
  f.write('import sympy as sy\n')
  f.write('\n')
  f.write(f'number_of_vibrational_degrees={number_of_vibrational_degrees}\n')
  f.write(f'max_indignation_step={max_indignation_step}\n')
  f.write(f"TYPE_ANGARMONIC_CONST='{TYPE_ANGARMONIC_CONST}'\n")
  for I in range(1,number_of_vibrational_degrees+1):# Изменил (for i in VECTOR_INDEX[:number_of_vibrational_degrees]:) так как в VECTOR_INDEX в начале добавил 0
    i=VECTOR_INDEX[I]
    a='n_%s'%(i)
    A='%s=sy.symbols(''"%s"'')#%s'%(a,a,I)
    CONST_n_LIST+="%s:0,"%(a)
    f.write(A+'\n')
    a='omega_%s'%(i)
    B='%s=sy.symbols(''"%s"'') #%s'%(a,a,I)
    CONST_W_LIST+="%s:0,"%(a)
    f.write(B+'\n')
    f.write('\n')
  f.write('\n')
  f.write('###########################################\n')
  f.write('\n')
  C=1
  while C<=max_indignation_step:
    for i in INDEX(C,number_of_vibrational_degrees):
      a='A_%s'%(i)
      A='%s=sy.symbols(''"%s"'')'%(a,a)
      CONST_A_LIST+="%s:0,"%(a)
      f.write(A+'\n')
    f.write('\n')
    f.write('###########################################\n')
    f.write('\n')
    C+=1
  C=-1
  f.write("D_0=sy.symbols('D_0')\n")
  CONST_D_LIST+="D_0:0,"
  while C<max_indignation_step-1:
    for i in INDEX(C,number_of_vibrational_degrees):
      a='D_%s'%(i)
      A='%s=sy.symbols(''"%s"'')'%(a,a)
      CONST_D_LIST+="%s:0,"%(a)
      f.write(A+'\n')
    
    f.write('\n')
    C+=1
  CONST_n_LIST='const_n_dikt={%s}'%(CONST_n_LIST[:-1])
  CONST_W_LIST='const_omega_dikt={%s}'%(CONST_W_LIST[:-1])
  CONST_A_LIST='const_angarmonik_dikt={%s}'%(CONST_A_LIST[:-1])
  CONST_D_LIST='const_dipol_dikt={%s}'%(CONST_D_LIST[:-1])

  f.write(CONST_n_LIST+'\n')
  f.write(CONST_W_LIST+'\n')
  f.write(CONST_A_LIST+'\n')
  f.write(CONST_D_LIST+'\n')
  f.write("ZAMENA={**const_n_dikt,**const_angarmonik_dikt,**const_dipol_dikt}\n")
  f.close()
  return