import sympy as sy

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
const_n_dict={n_i: 1, n_j: 1, n_k: 1}
const_omega_dict={omega_i: 2222, omega_j: 2, omega_k: 2}
const_angarmonik_dikt={A_iii: 1, A_iij: 1, A_iik: 2, A_ijj: 1, A_ijk: 1, A_ikk: 1, A_jjj: 0, A_jjk: 0, A_jkk: 0, A_kkk: 0}
ZAMENA={**const_n_dict, **const_omega_dict, **const_angarmonik_dikt}
