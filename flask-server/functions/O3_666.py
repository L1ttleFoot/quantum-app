import sympy as sy

number_of_vibrational_degrees=3
max_indignation_step=2
TYPE_ANGARMONIC_CONST='k'
title='O3'
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
const_omega_dikt={omega_i: 1134.9, omega_j: 716.0, omega_k: 1089.2}
const_angarmonik_dikt={A_iii: -49.5, A_iij: -27.72, A_iik: 0, A_ijj: -29.64, A_ijk: 0, A_ikk: -223.74, A_jjj: -19.06, A_jjk: 0, A_jkk: -53.59, A_kkk: 0, A_iiii: 2.47, A_iiij: -1.36, A_iiik: 0, A_iijj: -0.98, A_iijk: 0, A_iikk: 27.81, A_ijjj: 3.27, A_ijjk: 0, A_ijkk: 5.42, A_ikkk: 0, A_jjjj: 0.64, A_jjjk: 0, A_jjkk: -5.56, A_jkkk: 0, A_kkkk: 6.16}
const_dipol_dikt={D_0: 0, D_i: 0, D_j: 0, D_k: 0, D_ii: 0, D_ij: 0, D_ik: 0, D_jj: 0, D_jk: 0, D_kk: 0}
ZAMENA={n_i: 0, n_j: 0, n_k: 0, A_iii: -17.501, A_iij: -9.8, A_iik: 0, A_ijj: -10.479, A_ijk: 0, A_ikk: -79.104, A_jjj: -6.739, A_jjk: 0, A_jkk: -18.947, A_kkk: 0, A_iiii: 0.618, A_iiij: -0.34, A_iiik: 0, A_iijj: -0.245, A_iijk: 0, A_iikk: 6.952, A_ijjj: 0.818, A_ijjk: 0, A_ijkk: 1.355, A_ikkk: 0, A_jjjj: 0.16, A_jjjk: 0, A_jjkk: -1.39, A_jkkk: 0, A_kkkk: 1.54, D_0: 0, D_i: 0, D_j: 0, D_k: 0, D_ii: 0, D_ij: 0, D_ik: 0, D_jj: 0, D_jk: 0, D_kk: 0, omega_i: 1134.9, omega_j: 716.0, omega_k: 1089.2}
DATA_TABEL=[['0, 0, 0 ->2, 1, 0', '2883.5859', '1.0'], ['0, 0, 0 ->0, 1, 2', '2724.4853', '1.0'], ['2, 1, 0 ->0, 1, 2', '159.1006', '1.0'], ['0, 0, 0 ->2, 0, 1', '3185.5091', '1.0'], ['0, 0, 0 ->0, 0, 3', '3044.6126', '1.0'], ['2, 0, 1 ->0, 0, 3', '140.8965', '1.0'], ['0, 0, 0 ->1, 0, 0', '1103.0190', '1.0'], ['0, 0, 0 ->0, 0, 1', '1041.8963', '1.0'], ['1, 0, 0 ->0, 0, 1', '61.1227', '1.0'], ['0,0,0 ->1,0,0', '1103.0190', '1.0'], ['0,0,0 ->0,0,1', '1041.8963', '1.0'], ['0, 0, 0 ->3, 0, 0', '3290.7604', '1.0'], ['0, 0, 0 ->1, 0, 2', '3084.3885', '1.0'], ['3, 0, 0 ->1, 0, 2', '206.3719', '1.0'], ['0, 0, 0 ->2, 1, 0', '2883.5859', '1.0'], ['0, 0, 0 ->0, 1, 2', '2724.4853', '1.0'], ['2, 1, 0 ->0, 1, 2', '159.1006', '1.0'], ['0,0,0 ->0,1,0', '700.8647', '1.0'], ['0,1,0 ->1,1,1', '2083.5733', '1.0'], ['0,0,0 ->1,2,0', '2484.5475', '1.0'], ['0, 0, 0 ->1, 2, 0', '2484.5475', '1.0'], ['0, 0, 0 ->0, 2, 1', '2407.2973', '1.0'], ['1, 2, 0 ->0, 2, 1', '77.2502', '1.0']]
