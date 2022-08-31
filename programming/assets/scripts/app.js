const  ATTACK_VALUE =  10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE =  17;
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG ATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

 
let hasBonuseLife = true;
let battleLog = []; //object


function getMaxLifeValues(){
    const enteredValue = prompt('maximum life for you and the monster','100');

   const parsedValue = parseInt(enteredValue);

    if(isNaN(parsedValue) || parsedValue <= 0){
        throw {message: 'invalid user input not a valid'}  // throwing error when we input 
                                                                //different value instead of number
    }
    return parsedValue;
}
let chosenMaxLife = 45;





try{
     chosenMaxLife = getMaxLifeValues(); 
}catch(error){
    console.log(error);
    chosenMaxLife = 100;             //error sends text message to user 
    alert('racxa iyleve');
}finally{
                        //in finally code will always execute, but there is no need for it ;)
}



let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function writeToLog(event, value, monsterHealth){
    let logEntry;
    switch(event){              //same as if statement 
        case LOG_EVENT_PLAYER_ATTACK:
    } 
    if(event === LOG_EVENT_PLAYER_ATTACK){
       logEntry = {
         event: event,
         value: value,
         target: 'MONSTER',
         finalMonsterHealth:monsterHealth,
         finalPlayerHealth:currentPlayerHealth
       }; 
    }else if( event === LOG_EVENT_MONSTER_ATTACK){
        logEntry = {
            event: event,
            value: value,
            target: 'PLAYER',
            finalMonsterHealth:monsterHealth,
            finalPlayerHealth:currentPlayerHealth
        }; 
    }else if(event === LOG_EVENT_PLAYER_HEAL){
        logEntry = {
            event: event,
            value: value,
            target: 'PLAYER',
            finalMonsterHealth:monsterHealth,
            finalPlayerHealth:currentPlayerHealth
        }; 
    }else if(event === LOG_EVENT_GAME_OVER){
        logEntry = {
            event: event,
            value: value, 
            finalMonsterHealth:monsterHealth,
            finalPlayerHealth:currentPlayerHealth
        }; 
    }
    battleLog.push(logEntry);  // to show us array
}    

function reset (){
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife; //reset healthbar 
    resetGame(chosenMaxLife);
}

function endRound(){
    const initialPlayerHealth = currentPlayerHealth; 
    const PlayerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= PlayerDamage;
    writeToLog( 
        LOG_EVENT_MONSTER_ATTACK, 
        PlayerDamage, 
        currentMonsterHealth, 
        currentPlayerHealth);
    
    if(currentPlayerHealth <= 0 && hasBonuseLife === true){
        hasBonuseLife = false;
        removeBonusLife(); 
        currentPlayerHealth = initialPlayerHealth;
        alert("mktari iqnebodi mara gadarchi yleo");
        setPlayerHealth(initialPlayerHealth);
    }
    if(currentMonsterHealth <= 0 && currentPlayerHealth > 0){
        alert('YOU WON ');
        writeToLog(
            LOG_EVENT_GAME_OVER, 
            'PLAYER WON', 
            currentMonsterHealth, 
            currentPlayerHealth);
        reset();

    }else if(currentPlayerHealth <= 0 && currentMonsterHealth > 0){
        alert('you lost!')
        writeToLog(
            LOG_EVENT_GAME_OVER, 
            'MONSTER WON', 
            currentMonsterHealth, 
            currentPlayerHealth);
        reset();
    }else if(currentPlayerHealth <= 0 && currentMonsterHealth <= 0){
        alert(' you have a draw')
        writeToLog(
            LOG_EVENT_GAME_OVER, 
            'A DRAW',      
            currentMonsterHealth, 
            currentPlayerHealth);
        reset();
    }
    // an if(){
       // reset();
    //}
}
function attackMonster(mode){
    let maxDamage;
    let logEvent;
    if(mode === MODE_ATTACK){
        maxDamage = ATTACK_VALUE;
        logEvent = LOG_EVENT_PLAYER_ATTACK
    }else if(mode === MODE_STRONG_ATTACK){
        maxDamage = STRONG_ATTACK_VALUE;
        logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;    
    }
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    writeToLog(
        logEvent,
        damage, //array
        currentMonsterHealth, 
        currentPlayerHealth);
    endRound();
}
 

function attackHandler(){
   attackMonster(MODE_ATTACK);

}

function strongAttackHandler (){
    attackMonster(MODE_STRONG_ATTACK);
}

function healPlayerHandler(){
    let healValue;
    if(currentPlayerHealth>= chosenMaxLife - HEAL_VALUE){
        alert('you cant heal to more than your max initial health')
        healValue = chosenMaxLife - currentPlayerHealth;
    }else{
        healValue = HEAL_VALUE
    }
    increasePlayerHealth(healValue);   
    currentPlayerHealth += healValue;
    writeToLog(
        LOG_EVENT_PLAYER_HEAL, 
        healValue, 
        currentMonsterHealth, 
        currentPlayerHealth);
    endRound(); 
}

function printLogHndler (){
    
    console.log(battleLog);
}

attackBtn.addEventListener('click' , attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHndler);


