const firstButtonElement = document.getElementsByClassName("btn-start");
const situationsElement = document.getElementById("situations")
const coinCounterElement = document.getElementById("coin-counter")
const startBlockElement = document.getElementById("start-block")
const testElement = document.getElementById("test")
var animalArray = []
var animalMap = {} // сюда складываются подсчитываемые зверушки

for (let i of firstButtonElement) {
    i.onclick = function(e) {
        newblock(1)
        startBlockElement.style.display = 'none'
    }
}

// декоратор
// function chain(func) {
//     return function(t) {
//         while(t--) func();
//     }
// }

// добавление нового блока в section class="situations"
function newblock (blockId) {
    const block = document.createElement('div');
    block.classList.add('block');
    block.id = `block-${blockId}`;
    situationsElement.append(block)
    blockPush(blockId)
}

// наполнение <div class="block">, созданного в newblock
function blockPush (blockId) { 
    var block = document.getElementById(`block-${blockId}`); // находим новый блок, в который будем добавлять что-то после нажатия

    var blockNode = textNodes.find(blockNode => blockNode.id == blockId);
    if (!blockNode) {
        blockNode = textNodes.find(blockNode => blockNode.id == 1488)
    }

    if (blockNode.endTag) {
        resultsCounter(block)
        // function finalcounter
    }

    var h2 = document.createElement("h2") // <h2>
    h2.className = 'h2', 
    h2.innerText = blockNode.title
    block.append(h2);

    var p = document.createElement("p") // <p>
    p.className = 'first-version'
    p.innerText = blockNode.text
    block.append(p);

    // если endTag - вызываем restartbutton, иначе - кнопки с выбором
    if (blockNode.endTag) {
        addRestartButton(blockId, block)
    } else {
        // div для кнопок выбора и появляющегося комментария
        var buttonsGrid = document.createElement("div")
        buttonsGrid.className = 'buttons-grid'
        buttonsGrid.id = `buttons-grid${blockId}`
        block.append(buttonsGrid)
    
        for (i = blockNode.options.length; i != 0; --i) {
            addChooseButtonsToGrid(block, blockId, blockNode, buttonsGrid, i)
        }
    }
}

// наполнение buttons-grid кнопками (кнопка подтверждения - отдельная функция addSubmitButton)
function addChooseButtonsToGrid (block, blockId, blockNode, buttonsGrid, i) {
    // button
    var nodeOpt = blockNode.options[i-1]
    const button = document.createElement('button');
    button.className = 'btn-choose'
    button.type = `choose-block${blockId}`
    button.id = `btn-radio${blockId}${blockNode.options[i-1].animalPrize}`
    button.value = `${blockNode.options[i-1].animalPrize}`
    button.innerText = nodeOpt.buttonText;
    buttonsGrid.append(button)

    button.addEventListener('click', function(e) {

        var answerButtons = document.querySelectorAll(`[type="choose-block${blockId}"]`) // выбираем все кнопки выбора из buttons-grid
        answerButtons.forEach((g) => {
            if (g !== e.target) {
                g.setAttribute('disabled', true)
            }
        })

        value = e.target.value
        var ind = 99999
        blockNode.options.forEach((e) => { // получение индекса необходимого словаря в options
            if (e.animalPrize == value) {
                return ind = blockNode.options.indexOf(e)
            }
        })

        animalProgress (block, blockId, blockNode, ind)
        comment (blockId, blockNode, buttonsGrid, ind)
        addNextBlockButton (block, blockId, blockNode)

        // скролл
        var currentComment = document.getElementById(`comment-${blockId}`)
        scrollingToElem(currentComment)
    }, 
    // для предотвращения повторного события по нажатию на кнопку выбора
    {once : true}
    )
}

// добавление комментария к выбранному варианту ответа
function comment (blockId, blockNode, buttonsGrid, ind) { // комментарий
    // создание блока для коммента
    var commentDiv = document.createElement("div")
    commentDiv.className = "comment"
    commentDiv.id = `comment-${blockId}`
    buttonsGrid.append(commentDiv)

    // блок с картинками
    // var commentPicturesDiv = document.createElement("div")
    // commentPicture.className = "comment-pictures-div"
    // commentDiv.id = `comment-pictures${blockId}`
    

    // создание текста коммента
    var pcomment = document.createElement("p")
    pcomment.className = "p-comment"
    pcomment.innerText = blockNode.options[ind].comment

    commentDiv.append(pcomment)
}

// добавление жетона на прогресс-баре и запись количества в словарь 
function animalProgress(block, blockId, blockNode, ind) {
    animalPrize = blockNode.options[ind].animalPrize
    currentCircle = document.getElementById(`prog${blockId}`)
    currentCircle.style['background-image'] = `url('img/animal=${animalPrize}.png')`

    animalArray.push(animalPrize)

    currentCircle.addEventListener('click', function() {
        scrollingToElem(block)
    })
}

// кнопка "далее", добавляющая новый блок функцией newblock, описанной ранее
function addNextBlockButton (block, blockId, blockNode) {
    var nextbutton = document.createElement('button')
    nextbutton.type = 'to-next-block'
    nextbutton.classList.add('to-next-block');
    nextbutton.id = `to-next-block${blockId}`
    nextbutton.innerText = 'Далее';
    block.append(nextbutton)
    nextbutton.onclick = function() {
        newblock(blockNode.nextBlockId)
        nextbutton.style.display = 'none'

        // скролл к следующему блоку по нажатию на "далее"
        var nextBlock = document.getElementById(`block-${blockNode.nextBlockId}`)
        scrollingToElem(nextBlock)
    }
}

// подсчёт результатов на финальном экране
function resultsCounter(block) {
    var results = document.createElement("div")
    results.className = 'results-bar'
    results.id = 'results-bar'
    block.append(results)
    
    // подсчёт результата
    animalArray.sort()
    var result = {};
    for (var i = 0; i < animalArray.length; ++i)
    {
        var a = animalArray[i];
        if (result[a] != undefined)
            ++result[a];
        else
            result[a] = 1;
    }

    // заполнение блока результатами
    t = 0
    for (var key in result) {
        ++t
        // блок с картинкой и счётчиком
        var resultPoint = document.createElement("div")
        resultPoint.className = 'result-point'
        results.append(resultPoint)

        // картинка
        var resultImg = document.createElement("img")
        resultImg.className = 'result-img'    
        resultImg.id = `score${t}`
        resultImg.style['background-image'] = `url('img/animal=${key}.png')`
        resultPoint.append(resultImg)

        // счётчик
        var resultCount = document.createElement("span")
        resultCount.className = 'result-counter'
        resultCount.id = `result-counter${t}`
        resultCount.innerText = `x${result[key]}`
        resultPoint.append(resultCount)

        console.log('число ' + key + ' == ' + result[key] + ' раз(а) <br>');
    }
}

// полоска, заполняющаяся в зависимости от количества полученных жетонов
// function progressLine(colQty, block) {
//     var progressLine = document.createElement("div")
//     progressLine.className = 'progress-line'
//     progressLine.id = 'progress-line'
//     testElement.append(progressLine) // потом переписать testElement на block

//     let i = 1
//     while (i < (colQty + 1)) {
//         var progressColumn = document.createElement("div")
//         progressColumn.className = 'progress-line'
//         progressColumn.id = `progress-col${i}`
//         progressLine.append(progressColumn)
//         ++i
//     }
// }

// кнопка для перезапуска игры
function addRestartButton (blockId, block) {
    const restartButton = document.createElement('button');
    restartButton.type = 'restart'
    restartButton.classList.add('btn-restart');
    restartButton.id = `btn-restart${blockId}`
    restartButton.innerText = 'Попробовать снова';
    block.append(restartButton) 
    restartButton.onclick = function() {
        // очистка div="situation"
        situationsElement.innerHTML = ""
        // очистка результатов
        // animalArray = []
        var d = 10
        while (d !== 0) {
            var clearElem = document.getElementById(`prog${d}`)
            clearElem.style['background-image'] = 'none'
            --d
        }

        newblock(1)

        animalArray = []
        
        // скролл
        var questRestart = document.getElementById('situations')
        scrollingToElem(questRestart)
    } 
}

// просчёт y-координаты элемента относительно окна. вызывается в функции onclick
function scrollingToElem(elem) {
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return window.scrollTo({
        top: Math.round(top) - header.clientHeight,
        left: 0,
        behavior: 'smooth'
      })
}





// наполнение блоков (заголовки, картинки, информация о текущем и следующем блоках) 

let textNodes = [
    // Стартовая страница (всегда должна иметь id 1)
    {
        id: 1,
        title: '🛳 🛳 🛳',
        backgroundImageSrc: 'img/907a03f12af002.png',
        text: "Вы продаёте яхту и понимаете, что хотите выручить за неё 15 миллионов рéалов. Рука уже тянется разместить объявление на радиокомпьютерном рынке, как вам звонит знакомый яхтсмен из Граада, узнаёт новость о продаже, и предлагает забрать её завтра же за 16,5 миллионов рéалов.'Что делаем?",
        nextBlockId: 2,
        options: [
            {
                buttonText: "Беру деньги без промедления",
                animalPrize: 'sheep',
                comment: 'Типичное поведение овцы! Взять деньги без промедления, а потом думать о последствиях',
            },
            {
                buttonText: "Предлагаю покупателю подождать",
                animalPrize: 'donkey',
                comment: "Вы — упрямый осёл!'Отпускать покупателя нельзя — он же может присмотреть себе другую яхту прямо сейчас",
            },
            {
                buttonText: "Торгуюсь",
                animalPrize: 'owl',
                comment: "Лис и сова — лучшее сочетание.Поторговаться нужно, даже если вы не не выиграете в цене — так продавец будет ощущать, что вынудил вас пойти на его условия, хотя вы были в выигрыше с самого начала.",
            },
        ]
    },
    {
        id: 2,
        title: '👷👷‍👷‍',
        backgroundImageSrc: 'img/907a03f12af002.png',
        text: "Вы занимаетесь установкой кухонь в Оранье и только что закончили обмеры в доме у нового клиента. Какую цену назвать?",
        nextBlockId: 3,
        options: [
            {
                buttonText: "Дам смету, распишу детально",
                animalPrize: 'sheep',
                comment: 'Только овцы дают клиентам полные сметы — это побуждает к торгу и экономии на отдельных элементах работы, вместо того, чтобы обсуждать её целиком. Тем не менее, для себя смету нужно требовать всегда',
            },
            {
                buttonText: "Дам смету, распишу приблизительно",
                animalPrize: 'sheep',
                comment: 'Только овцы дают клиентам полные сметы. Овцы поумнее предлагаю приблизительную смету. Умные лисы сразу называют общую цену.',
            },
            {
                buttonText: "Назову одну общую цену",
                animalPrize: 'fox',
                comment: 'Верно. Общая цифра поможет Лису варьировать статьи расходов. Никогда не давайте раскладок: ни детальных, приблизительных, пока вас об этом не попросят.',
            },
        ]
    },
    {
        id: 3,
        title: '🥤🥤🥤',
        backgroundImageSrc: 'img/907a03f12af002.png',
        text: "Вы — поставщик товаров в гипермаркет. Только что закончились переговоры с представителем сети магазинов, который был очень рад вас видеть. Дело в том, что предыдущий поставщик внезапно пропал с радаров, и вы — их последняя надежда. Человек с другой стороны переговорного стола спрашивает: сможете ли вы немедленно доставить 50 000 упаковок «Добрый Колы». Что будете делать?",
        nextBlockId: 4,
        options: [
            {
                buttonText: "Соглашусь — это ж 50 000 упаковок колы!",
                animalPrize: 'sheep',
                comment: 'Нет. В конце концов, вы переговорщик или приемщик заказов? \n' +
                    '\n' +
                    'В любом случае, это ход овцы. Нужно просить доплату.',
            },
            {
                buttonText: "Соглашусь, попрошу доплату в 5% за срочность",
                animalPrize: 'owl',
                comment: 'Да. Хороший совиный первый ход. ',
            },
            {
                buttonText: "Скажу, что в такие сроки уложиться невозможно",
                animalPrize: 'owl',
                comment: 'Всё возможно, не придумывайте. Хотя, может вы просто осёл?',
            },

        ]
    },
    {
        id: 4,
        title: '🧭🧭🧭',
        backgroundImageSrc: 'img/907a03f12af002.png',
        text: 'Вы — туроператор. Вам позвонила сеть гостиниц в Сеоле и рассказывает, какие будут цены на их отели в новом сезоне. Цена за человека в неделю, которую они просят сейчас, на 3000 рéалов выше предыдущей. Разницу они предлагают делить пополам. Пойдёте на авантюру?',
        nextBlockId: 5,
        options: [
            {
                buttonText: "Да, но предложу поделить доход 55/45 в свою пользу",
                animalPrize: 'fox',
                comment: 'Неплохо, но неидеально. Выдаёт в вас лиса, который хочет и нажиться и достичь компромисса',
            },
            {
                buttonText: "Нет, такие условия мне не по карману",
                animalPrize: 'owl',
                comment: 'Идеально. Предложение поделить доход означает, что стоимость человеконедели в этих отелях как минимум на 1500 рéалов завышена. Представьте, сколько вы потеряете за 10 000 человеконедель.',
            },
            {
                buttonText: "Да",
                animalPrize: 'owl',
                comment: 'Никогда. Если покажете другим переговорщикам, что готовы к компромиссам, то условия с каждым разом будут становиться всё хуже. Ослиный ход.',
            },

        ]
    },
    {
        id: 5,
        title: '❗❗❗',
        backgroundImageSrc: 'img/907a03f12af002.png',
        text: 'Ну дела, ваши сотрудники подняли забастовку.  Выдвигают странные коммунистические лозунги и требуют дать им право на работу. Остановили работу целой бухты. Она неофициальная и нелегальная. Как быть?',
        nextBlockId: 6,
        options: [
            {
                buttonText: "Грозно прикажу вернуться на свои места",
                animalPrize: 'sheep',
                comment: 'Классический осёл.Теперь у вас два конфликта: проблема с рабочими и ваше умщемление их прав на забастовку.',
            },
            {
                buttonText: "Грозно прикажу и подам в суд, если не послушают",
                animalPrize: 'sheep',
                comment: 'Классический осёл, ухудшенная версия. Теперь у вас три конфликта: проблема с рабочими, ваше умщемление их прав на забастовку и угроза законом. Удачи.',
            },
            {
                buttonText: "Скажу, забастовка не даст результата",
                animalPrize: 'owl',
                comment: 'Именно. Спокойно выслушайте требования, и не соглашайтесь.',
            },

        ]
    },
    {
        id: 6,
        title: '🚚 🚚 🚚',
        backgroundImageSrc: 'img/907a03f12af002.png',
        text: 'Вы водите грузовик. Пандемия оставила вас без работы. И тут — объявление. Всем безработным водителям говорят подойти на площадь Людовика XIV к 14 часам. Подойдя на площадь в 13:55 вы видите в очереди 20 человек. Как отреагируете?',
        nextBlockId: 7,
        options: [
            {
                buttonText: "Ну всё, теперь работы не видать",
                animalPrize: 'sheep',
                comment: 'Откуда вы знаете, что все они — безработные водители? Ответ осла.',
            },
            {
                buttonText: "Двадцать и двадцать, чего такого-то",
                animalPrize: 'owl',
                comment: 'Неплохой вариант, но не самый продуктивный. Конкуренцией надо вдохновляться. А это — ход совы.',
            },
            {
                buttonText: "Отлично! Выше ставки",
                animalPrize: 'fox',
                comment: 'Хитрый лис всегда знает, какая ситуация принесёт ему больше пользы и веселья.',
            },

        ]
    },
    {
        id: 7,
        title: '🎹 🎹 🎹 ',
        backgroundImageSrc: 'img/907a03f12af002.png',
        text: 'Вы продаёте фортепиано для производства анодной музыки. Покупатель приехал на просмотр и спрашивает, сколько вы за него хотите. Как отреагируете?',
        nextBlockId: 8,
        options: [
            {
                buttonText: "Назову цену повыше ожидаемой",
                animalPrize: 'fox',
                comment: 'Именно! Лис уверен в ценах, и называет их не колеблясь',
            },
            {
                buttonText: "Спрошу, что предложит покупатель",
                animalPrize: 'donkey',
                comment: 'Неуверенные в себе овцы сразу отрубают возможность торга',
            },
            {
                buttonText: "Назову цену пониже ожидаемой",
                animalPrize: 'donkey',
                comment: 'Вы явно только что вернулись с ослиной фермы. Обрубать себе возможность торга нельзя.',
            },

        ]
    },
    {
        id: 8,
        title: '👖👖👖',
        backgroundImageSrc: 'img/907a03f12af002.png',
        text: 'Вы — бизнесмен. Рядом с вами на встрече сидит человек. Он одет в хороший костюм и носит дорогие туфли. На руке — часы «ФАЛН». Оцените его состоятельность.',
        nextBlockId: 9,
        options: [
            {
                buttonText: "Богатый",
                animalPrize: 'fox',
                comment: "А вам откуда знать? Ослиная оценка."
            },
            {
                buttonText: "Бедный",
                animalPrize: 'donkey',
                comment: "А вам откуда знать? Ослиная оценка."
            },
            {
                buttonText: "Неопределённый",
                animalPrize: 'owl',
                comment: "Именно! Сова уверена в своём сомнении."
            },

        ]
    },
    {
        id: 9,
        title: '🇯🇵 🇯🇵 🇯🇵🇯',
        backgroundImageSrc: 'img/907a03f12af002.png',
        text: "Вы — мастер переговоров и полетели в Игаунию, решать вопросы с весперским производителем HDMI-кабелей. Переговоры затянулись на несколько дней. Как выйдете из порочного круга?",
        nextBlockId: 10,
        options: [
            {
                buttonText: "Подождёте первого хода от коллег",
                animalPrize: 'fox',
                comment: 'Долго же вам ждать придётся. Обычно ослам терпения недостаёт.',
            },
            {
                buttonText: "Сделаете уступку, чтобы подтолкнуть сделку",
                animalPrize: 'sheep',
                comment: 'Где одна уступка так и вторая. На овцах ездят нечасто. На вас — будут.',
            },
            {
                buttonText: "Полностью смените тему",
                animalPrize: 'owl',
                comment: 'Да. Уверенный совиный ход — перевести внимание.',
            },

        ]
    },
    {
        id: 10,
        title: '🛑 🛑 🛑',
        backgroundImageSrc: 'img/907a03f12af002.png',
        text: "Вы водите мотокарету. Её остановил полицеский близ Ареопагитских холмов. Требует 50 рéалов взятки, или выпишет квитанцию за превышение скорости. Вы водите аккуратно и знаете, что привлечь к ответсвенности вас не за что Как выйдете из ситуации?",
        nextBlockId: 11,
        options: [
            {
                buttonText: "«ЗАПЛАЧУ КАК ТОЛЬКО УВИЖУ АДВОКАТА»",
                animalPrize: 'donkey',
                comment: "Отличный способ попасть на тысячу рéалов. Ослиный ход."
            },
            {
                buttonText: "«Взятки берёте»?",
                animalPrize: 'fox',
                comment: "Слабоумие и отвага. Ареопагиты известны ненавистью к нарушителям закона. Лисий ход. Неверный ход."
            },
            {
                buttonText: "«Сдача с сотни найдётся»?",
                animalPrize: 'owl',
                comment: "Сдачу, может, и не получите, но совиные карты разыграете."
            },
        ]
    },
    {
        id: 11,
        title: 'Победа!',
        text: 'Либо ты крутая сова, либо уже читал книгу и что-то знал. В любое случае — совы не то чем кажутся!',
        endTag: true,
    },
    
    // сообщение на случай, если что-то пошло не так
    {
        id: 1488,
        imgSrc: 'img/907a03f12af002.png',
        title: 'Упс!',
        text: 'Такой ветки нет, и, похоже, разработчик где-то накосячил...',
        endTag: true,
    },
    // тест-ветки для проверки различных условий
    // {
    //     id: 666,
    //     imgSrc: 'img/907a03f12af002.png',
    //     title: 'Функции, мои функции!',
    //     text: 'Словарь с концовками имеет стандартный id и пару "endTag: true". Эта проверка нужна для того чтобы вместо формы с выбором вариантов ответа добавить кнопку со сбросом всех элементов из div="situation", сбросом счётчика денег и рестарта квеста. <br> <br> Возврат в одну и ту же ветку не работает! <br> <br> Следующие ветки обязательно должны иметь разный Id (если будет два лейбла с одинаковым Id, то css для выбранного лейбла не будет работать) <br> <br> Также если предложить выбрать ветку "n" в одном блоке, а затем предложить ветку "n" в другом блоке, то выбор также не будет работать, поскольку программа будет обращаться по параметру value к кнопке из другого блока',
    //     options: [
    //         {
    //             buttonText: "Отнять все монеты",
    //             nextBlockId: 312,
    //             comment: 'Вы выбрали этот вариант и он вас приведёт в ветку 312',
    //             minusMoney: 99999999,
    //         },
    //         {
    //             buttonText: "Уйти в концовку (победа)",
    //             nextBlockId: 337,
    //         },
    //         {
    //             buttonText: "Уйти в концовку (поражение)",
    //             nextBlockId: 228,
    //         },
    //         {
    //             buttonText: "Отнять часть денег (-200) и уйти в ветку 7",
    //             nextBlockId: 7,
    //             comment: 'Таинственная магия отнимает ваши деньги',
    //             minusMoney: 200,
    //         },
    //         {
    //             buttonText: 'Прибавить часть денег (+200) и уйти в ветку 6',
    //             nextBlockId: 6,
    //             comment: 'Таинственная магия прибавляет вам деньги',
    //             plusMoney: 200,
    //         },
    //         {
    //             buttonText: 'вызов блока с текстом',
    //             nextBlockId: 10,
    //             comment: 'Таинственная магия вызывает блок с текстом', 
    //         }
    //     ]
    // },
    // {
    //     id: 10,
    //     imgSrc: 'img/907a03f12af002.png',
    //     title: 'Просто текстовый блок',
    //     text: 'Ведёт в блок 11',
    //     textBlock: true,
    //     options: [
    //         {
    //             buttonText: "далее",
    //             nextBlockId: 11,
    //         },
    //     ]
    // },
    // {
    //     id: 11,
    //     imgSrc: 'img/907a03f12af002.png',
    //     title: 'Ура!',
    //     text: 'Текстовый блок работает!!! Проверяем, работает ли второй',
    //     textBlock: true,
    //     options: [
    //         {
    //             buttonText: "далее",
    //             nextBlockId: 300,
    //         },
    //     ]
    // },
    // {
    //     id: 300,
    //     imgSrc: 'img/907a03f12af002.png',
    //     title: 'Ура!',
    //     text: 'И этот работает!',
    //     endTag: true
    // },

    // // концовки
    // // если есть endTag, то вместо формы выбора отрисовывается кнопка рестарта квеста.

    // // закончились деньги
    // {
    //     id: 312,
    //     imgSrc: 'img/907a03f12af002.png',
    //     title: 'Упс!',
    //     text: 'У вас закончились деньги!',
    //     endTag: true,
    // },
    // // победа
    // {
    //     id: 337,
    //     imgSrc: 'img/907a03f12af002.png',
    //     title: 'Победа!',
    //     text: 'Вы такой молодец, что просто невозможно себе представить',
    //     endTag: true
    // },

    // //провал
    // {
    //     id: 228,
    //     imgSrc: 'img/907a03f12af002.png',
    //     title: 'Поражение',
    //     text: 'Не расстраивайтесь и попробуйте снова',
    //     endTag: true,
    // },
]