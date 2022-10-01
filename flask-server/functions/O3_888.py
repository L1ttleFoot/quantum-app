import sympy as sy

number_of_vibrational_degrees=3
max_indignation_step=2
TYPE_ANGARMONIC_CONST='k'
title='18O3'
n_i=sy.symbols("n_i")
omega_i=sy.symbols("omega_i")

n_j=sy.symbols("n_j")
omega_j=sy.symbols("omega_j")

n_k=sy.symbols("n_k")
omega_k=sy.symbols("omega_k")


###########################################

A_iii=sy.symbols("A_iii")
A_iij=sy.symbols("A_iij")
A_iik=sy.symbols("A_iik")
A_ijj=sy.symbols("A_ijj")
A_ijk=sy.symbols("A_ijk")
A_ikk=sy.symbols("A_ikk")
A_jjj=sy.symbols("A_jjj")
A_jjk=sy.symbols("A_jjk")
A_jkk=sy.symbols("A_jkk")
A_kkk=sy.symbols("A_kkk")

###########################################

A_iiii=sy.symbols("A_iiii")
A_iiij=sy.symbols("A_iiij")
A_iiik=sy.symbols("A_iiik")
A_iijj=sy.symbols("A_iijj")
A_iijk=sy.symbols("A_iijk")
A_iikk=sy.symbols("A_iikk")
A_ijjj=sy.symbols("A_ijjj")
A_ijjk=sy.symbols("A_ijjk")
A_ijkk=sy.symbols("A_ijkk")
A_ikkk=sy.symbols("A_ikkk")
A_jjjj=sy.symbols("A_jjjj")
A_jjjk=sy.symbols("A_jjjk")
A_jjkk=sy.symbols("A_jjkk")
A_jkkk=sy.symbols("A_jkkk")
A_kkkk=sy.symbols("A_kkkk")

###########################################

D_0=sy.symbols('D_0')
D_i=sy.symbols("D_i")
D_j=sy.symbols("D_j")
D_k=sy.symbols("D_k")

D_ii=sy.symbols("D_ii")
D_ij=sy.symbols("D_ij")
D_ik=sy.symbols("D_ik")
D_jj=sy.symbols("D_jj")
D_jk=sy.symbols("D_jk")
D_kk=sy.symbols("D_kk")

const_n_dikt={n_i: 0, n_j: 0, n_k: 0}
const_omega_dikt={omega_i: 1069.85, omega_j: 674.96, omega_k: 1026.77}
const_angarmonik_dikt={A_iii: -45.31, A_iij: -25.37, A_iik: 0, A_ijj: -27.13, A_ijk: 0, A_ikk: -204.78, A_jjj: -17.44, A_jjk: 0, A_jkk: -49.04, A_kkk: 0, A_iiii: 2.19, A_iiij: -1.2, A_iiik: 0, A_iijj: -0.87, A_iijk: 0, A_iikk: 24.71, A_ijjj: 2.9, A_ijjk: 0, A_ijkk: 4.81, A_ikkk: 0, A_jjjj: 0.57, A_jjjk: 0, A_jjkk: -5.29, A_jkkk: 0, A_kkkk: 5.47}
const_dipol_dikt={D_0: 0, D_i: 0, D_j: 0, D_k: 0, D_ii: 0, D_ij: 0, D_ik: 0, D_jj: 0, D_jk: 0, D_kk: 0}
ZAMENA={n_i: 0, n_j: 0, n_k: 0, A_iii: -16.02, A_iij: -8.97, A_iik: 0, A_ijj: -9.592, A_ijk: 0, A_ikk: -72.401, A_jjj: -6.166, A_jjk: 0, A_jkk: -17.338, A_kkk: 0, A_iiii: 0.547, A_iiij: -0.3, A_iiik: 0, A_iijj: -0.217, A_iijk: 0, A_iikk: 6.178, A_ijjj: 0.725, A_ijjk: 0, A_ijkk: 1.202, A_ikkk: 0, A_jjjj: 0.142, A_jjjk: 0, A_jjkk: -1.323, A_jkkk: 0, A_kkkk: 1.367, D_0: 0, D_i: 0, D_j: 0, D_k: 0, D_ii: 0, D_ij: 0, D_ik: 0, D_jj: 0, D_jk: 0, D_kk: 0, omega_i: 1069.85, omega_j: 674.96, omega_k: 1026.77}
DATA_TABEL=[['0, 0, 0 ->1, 1, 0', '1694.7440', '1.0'], ['0, 0, 0 ->0, 1, 1', '1630.2788', '1.0'], ['1, 1, 0 ->0, 1, 1', '64.4652', '1.0'], ['0,2,1 ->0,1,1', '-643.9546', '1.0'], ['0,0,1 ->0,1,1', '645.7373', '1.0'], ['0, 0, 0 ->1, 1, 0', '1694.7440', '1.0'], ['0, 0, 0 ->0, 0, 1', '984.5415', '1.0'], ['1, 1, 0 ->0, 0, 1', '710.2026', '1.0'], ['0, 0, 0 ->0, 1, 1', '1639.9181', '1.0'], ['0, 0, 0 ->0, 0, 1', '974.9021', '1.0'], ['0, 1, 1 ->0, 0, 1', '665.0160', '1.0'], ['0,0,1 ->0,1,1', '645.7373', '1.0'], ['1,1,0 ->0,0,1', '-710.2026', '1.0'], ['0,0,0 ->1,0,1', '1994.8519', '1.0'], ['0,0,1 ->2,0,1', '2011.8909', '1.0'], ['2,1,0 ->0,1,0', '-2058.0848', '1.0'], ['0,0,1 ->0,0,3', '1912.5647', '1.0'], ['0, 0, 0 ->2, 0, 0', '2078.6812', '1.0'], ['0, 0, 0 ->0, 0, 2', '1945.8111', '1.0'], ['2, 0, 0 ->0, 0, 2', '132.8701', '1.0'], ['0, 0, 0 ->2, 0, 1', '2996.4323', '1.0'], ['0, 0, 0 ->1, 0, 2', '2929.3750', '1.0'], ['2, 0, 1 ->1, 0, 2', '67.0573', '1.0'], ['2,0,1 ->1,0,0', '-1954.9429', '1.0'], ['0, 0, 0 ->2, 0, 1', '2996.4323', '1.0'], ['0, 0, 0 ->1, 0, 0', '1041.4895', '1.0'], ['2, 0, 1 ->1, 0, 0', '1954.9429', '1.0'], ['1,0,2 ->0,0,1', '-1944.8335', '1.0'], ['0, 0, 0 ->1, 0, 2', '2929.3750', '1.0'], ['0, 0, 0 ->0, 0, 1', '984.5415', '1.0'], ['1, 0, 2 ->0, 0, 1', '1944.8335', '1.0'], ['0,0,0 ->1,1,1', '2632.5073', '1.0']]
