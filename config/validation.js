module.exports = app => {

    function validator(dado, msg) {
        if(!dado) throw msg
        if( Array.isArray(dado) && dado.length === 0) throw msg
        if(typeof dado === 'string' && !dado.trim() === '') throw msg
    }

    return { validator }
}