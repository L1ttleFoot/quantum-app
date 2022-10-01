import sympy as sy

number_of_vibrational_degrees=2
max_indignation_step=1
TYPE_ANGARMONIC_CONST='A'
n_i=sy.symbols("n_i")#1
omega_i=sy.symbols("omega_i") #1

n_j=sy.symbols("n_j")#2
omega_j=sy.symbols("omega_j") #2


###########################################

A_iii=sy.symbols("A_iii")
A_iij=sy.symbols("A_iij")
A_ijj=sy.symbols("A_ijj")
A_jjj=sy.symbols("A_jjj")

###########################################

D_0=sy.symbols('D_0')
D_i=sy.symbols("D_i")
D_j=sy.symbols("D_j")

const_n_dikt={n_i:0,n_j:0}
const_omega_dikt={omega_i:0,omega_j:0}
const_angarmonik_dikt={A_iii:0,A_iij:0,A_ijj:0,A_jjj:0}
const_dipol_dikt={D_0:0,D_i:0,D_j:0}
ZAMENA={**const_n_dikt,**const_angarmonik_dikt,**const_dipol_dikt}
