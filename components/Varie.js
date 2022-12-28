//metodo per controllare se una data casella (coordinate come parametri) contiene un segmento di serpente (vettore come parametro snake)
export function hasSnake(x,y,snake){
    for(let i=0; i<snake.length; i++) {
        if(snake[i].x==x && snake[i].y==y)
        return true;
    }
    return false;
};