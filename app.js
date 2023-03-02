// console.log("hello from the javascript");

const animals = [
    {
        name: 'finneas',
        emoji: '🦩',
        status: '😊',
        hunger: 100,
        // ANCHOR extra property for expanding gameplay; maybe I want to purchase new animals
        cost: 1000
    },
    {
        name: 'ferb',
        emoji: '🦁',
        status: '😊',
        hunger: 100
    },
    {
        name: 'snow',
        emoji: '🐆',
        status: '😊',
        hunger: 100
    },
    {
        name: 'slim',
        emoji: '🦛',
        status: '😊',
        hunger: 200
    },
    {
        name: 'tubs',
        emoji: '🦒',
        status: '😊',
        hunger: 100,
        // ANCHOR extra property for expanding gameplay; maybe I want to render animals differently based on their type, or maybe they do different things
        type: 'land'
    },
    {
        name: 'sunny',
        emoji: '🐧',
        status: '😊',
        hunger: 100,
        // ANCHOR extra property for expanding gameplay; maybe I want to render animals differently based on their type, or maybe they do different things
        type: 'aquatic'
    },
]

let money = 0
let lastPaycheck = 0

function feedFinneas() {
    // TODO find the animal I want to feed.. find finneas
    // TODO after finding, feed... increase hunger
    let finneas = animals.find(a => a.name == 'finneas')
    if (finneas.status != '💀') {
        finneas.hunger += 10
        // clamp... do not feed animals more than 100
        if (finneas.hunger > 100) finneas.hunger = 100
        updateAnimal(finneas.name)
    }
    console.log(finneas);
}

function feedAnimal(name) {
    console.log(name, 'feeding animal');
    // TODO find the animal I want to feed
    // TODO check to see if I can feed the animal
    // TODO if i can, increase its hunger
    // TODO don't overfeed the animal
    // TODO after feeding, update
    let animal = animals.find(a => a.name == name)
    if (animal.status != '💀' && animal.hunger < 100) {
        animal.hunger += 5
        updateAnimal(animal.name)
    }
}

function reviveAnimal(name) {
    console.log(name, 'revive animal');
    // prevents the context menu from opening
    window.event.preventDefault()
    // TODO find the animal that I'm trying to revive
    // TODO check to see if I have enough $$$ to revive AND that the animal is dead
    // TODO revive the animal
    // TODO pay the witchdoctor
    let animal = animals.find(a => a.name == name)
    // console.log(animal);
    if (money >= 1000 && animal.status == '💀') {
        money -= 1000
        animal.hunger = 50
        console.log(animal, 'witchdoctor');

        let animalElem = document.getElementById(animal.name)
        let mq1 = animalElem.querySelector('.mq1')
        let mq2 = animalElem.querySelector('.mq2')
        let emoji = animalElem.querySelector('.emoji')
        emoji.innerText = animal.emoji
        mq1.start()
        mq2.start()

    } else if (money < 1000) {
        window.alert("get your bread up")
    } else if (animal.status != '💀') {
        window.alert("he's just sleeping")
    }
    updateAnimal(animal.name)
}

// ANCHOR draw function for handling HTML injection
function drawMoney() {
    let moneyElem = document.getElementById('money')
    let paycheckElem = document.getElementById('paycheck')
    moneyElem.innerText = money
    paycheckElem.innerText = lastPaycheck
}

// ANCHOR update to manipulate pre-existing HTML elements
function updateAnimal(name) {
    // TODO find the animal I want to update
    // TODO after finding, need to update its display
    let animal = animals.find(a => a.name == name)
    // TODO after finding the animal, also update its status
    updateStatus(animal)
    console.log(animal);
    let animalElem = document.getElementById(animal.name) //grab the animal element by its id

    // NOTE query selector will return the first descendant 
    // NOTE we are specifically using query selector bc we will need this to run for ea. individual animal; prevents the need for handling unique id's

    let statsView = animalElem.querySelector('.stats') //target animal elem's descendants w/ the query selector

    // NOTE here is how we could use interpolation for unique id's
    // document.getElementById(`${animal.name}-stats`)

    statsView.innerText = `${animal.name} | ${animal.status} | ${animal.hunger}`
    console.log(statsView);

    // TODO when the animal dies, make it die lol
    if (animal.status == '💀') {
        let mq1 = animalElem.querySelector('.mq1')
        let mq2 = animalElem.querySelector('.mq2')
        let emoji = animalElem.querySelector('.emoji')
        emoji.innerText = "🪦"
        mq1.stop()
        mq2.stop()
    }
}

// STUB chose to create a separate fn so I could keep my logic here, and my updating of the DOM separate
// REVIEW here we passed in the entire animal object because we already found it in our updateAnimal fn
function updateStatus(animal) {
    // ANCHOR we took this logic out of our updateAnimal and refactored it into its own function
    console.log('update status');
    if (animal.hunger > 50) {
        animal.status = '😊'
    } else if (animal.hunger > 20) {
        animal.status = '😐'
    } else if (animal.hunger > 0) {
        animal.status = '😖'
    } else {
        animal.status = '💀'
    }
}

function breakdownCalories() {
    // TODO look at all the animals
    // TODO make the animals hungry
    animals.forEach(a => {
        a.hunger -= 5
        if (a.hunger < 0) a.hunger = 0
        updateAnimal(a.name)
    })
    console.log(animals);
}


function getPaid() {
    console.log('getting paid');
    // TODO look at all of the animal's status
    // TODO depending on the status, I want to be rewarded
    let paycheck = 0
    animals.forEach(a => {
        switch (a.status) {
            case '😊':
                paycheck += 15
                break
            case '😐':
                paycheck += 8
                break
            case '😖':
                paycheck += 5
                break
            case '💀':
                paycheck += 0
                break
        }

    })
    console.log(paycheck, 'paycheck');
    // REVIEW paycheck is how much money I earned in this interval
    lastPaycheck = paycheck
    // REVIEW money is how much money I have taken home over time
    money += paycheck
    drawMoney()
}


//              ⬇️⬇️ provide a fn as an argument... this is the fn I want to run on the inteval, DO NOT INVOKE
setInterval(breakdownCalories, 1000)
//                         ⬆️⬆️ how often I want the interval to run
setInterval(getPaid, 1000)

// NOTE we are provided a 'callback' here as a set of instructions to be ran every so often
// NOTE if we invoke the fn with (), the fn will run only one time


