import sympy as sy

number_of_vibrational_degrees=3
max_indignation_step=2
TYPE_ANGARMONIC_CONST="A"
n_i=sy.symbols("n_i")
n_j=sy.symbols("n_j")
n_k=sy.symbols("n_k")
omega_i=sy.symbols("omega_i")
omega_j=sy.symbols("omega_j")
omega_k=sy.symbols("omega_k")
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
D_0=sy.symbols("D_0")
const_n_dict={n_i: 0, n_j: 0, n_k: 0}
const_omega_dict={omega_i: 0.0, omega_j: 0.0, omega_k: 0.0}
const_anharmonic_dict={A_iii: 0.0, A_iij: 0.0, A_iik: 0.0, A_ijj: 0.0, A_ijk: 0.0, A_ikk: 0.0, A_jjj: 0.0, A_jjk: 0.0, A_jkk: 0.0, A_kkk: 0.0}
const_dipol_dict={D_0: 0}
ZAMENA={**const_n_dict, **const_omega_dict, **const_anharmonic_dict, **const_dipol_dict}
