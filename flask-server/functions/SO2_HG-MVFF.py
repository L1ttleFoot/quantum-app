import sympy as sy

number_of_vibrational_degrees=3
max_indignation_step=2
TYPE_ANGARMONIC_CONST='k'
title='SO2'
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
const_omega_dikt={omega_i: 1171, omega_j: 525, omega_k: 1378}
const_angarmonik_dikt={A_iii: 46, A_iij: -17, A_iik: 0, A_ijj: -25, A_ijk: 0, A_ikk: 170, A_jjj: 3.5, A_jjk: 0, A_jkk: 7.6, A_kkk: 0, A_iiii: 2, A_iiij: 0, A_iiik: 0, A_iijj: -4.8, A_iijk: 0, A_iikk: 16, A_ijjj: 0, A_ijjk: 0, A_ijkk: 0, A_ikkk: 0, A_jjjj: 0.4, A_jjjk: 0, A_jjkk: -6.3, A_jkkk: 0, A_kkkk: 2.9}
const_dipol_dikt={D_0: 0, D_i: 0, D_j: 0, D_k: 0, D_ii: 0, D_ij: 0, D_ik: 0, D_jj: 0, D_jk: 0, D_kk: 0}
ZAMENA={n_i: 0, n_j: 0, n_k: 0, A_iii: 16.263, A_iij: -6.01, A_iik: 0.0, A_ijj: -8.839, A_ijk: 0, A_ikk: 60.104, A_jjj: 1.237, A_jjk: 0, A_jkk: 2.687, A_kkk: 0, A_iiii: 0.5, A_iiij: 0, A_iiik: 0, A_iijj: -1.2, A_iijk: 0, A_iikk: 4.0, A_ijjj: 0, A_ijjk: 0, A_ijkk: 0, A_ikkk: 0, A_jjjj: 0.1, A_jjjk: 0, A_jjkk: -1.575, A_jkkk: 0, A_kkkk: 0.725, D_0: 0, D_i: 0, D_j: 0, D_k: 0, D_ii: 0, D_ij: 0, D_ik: 0, D_jj: 0, D_jk: 0, D_kk: 0, omega_i: 1171, omega_j: 525, omega_k: 1378}
DATA_TABEL=[['0, 0, 0 ->1, 0, 0', '1155.0196', '1.0'], ['0, 0, 0 ->0, 0, 1', '1354.9168', '1.0'], ['0,0,0 ->1,0,1', '2493.3526', '1.0']]
