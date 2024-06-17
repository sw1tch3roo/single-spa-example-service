// абстрактный пример функции по определению авторизации пользователя
// чаще всего в проектах будет встречаться состояния из store (redux / mobx / effector)
export const isAuth = () => localStorage.getItem('token')
