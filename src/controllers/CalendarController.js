const Event = require('../src/db/eventoDB');

const {startDate, startTime, endDate, endTime, title, description} = req.body;
    let errors = [];
    console.log(' startDate ' + startDate+ ' startTime ' + startTime+ ' endDate :' + endDate+ ' endTime:' + endTime+ ' title :' + title+ ' description:' + description);
    if(!startDate || !startTime || !endDate || !endTime || !title || !description) {
        errors.push({msg : "Por favor preencha todos os campos"})
    }
    //check if match
    if(startTime === endTime) {
        errors.push({msg : "Não pode começar e acabar no mesmo horário"});
    }

    if(errors.length > 0 ) {
        res.render('create-account-page', {
            errors : errors,
            startDate : startDate,
            startTime : startTime,
            endDate : endDate,
            endTime : endTime,
            title : title,
            description : description
        })
    } else {
        Event.findOne({title : title}).exec((err,event)=>{
            console.log(event);   
            if(event) {
                errors.push({msg: 'Evento já existe'});
                res.render('events-page',{errors,startDate, startTime, endDate, endTime, title, description})  
                console.log('Evento já existe');
               } else {
                const newEvent = new Event({
                    startDate : startDate,
                    startTime : startTime,
                    endDate : endDate,
                    endTime : endTime,
                    title : title,
                    description : description
                });
               }
               newEvent.save()
               .then((value)=>{
                   console.log(value)
                   //req.flash('success_msg','You have now registered!');
                   res.redirect('/events');
               })
               .catch(value=> console.log(value)); 
               
               
               if(newEvent.value = 1) {
                let thereIsEvents;
                return thereIsEvents = true;
                }
        })
    }