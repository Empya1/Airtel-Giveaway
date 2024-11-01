

function getIp(callback) { 
    fetch(
        "https://ipinfo.io/json?token=bc96e2ade0ceb7", 
        { headers: { 'Accept': 'application/json' }}) 
        .then((resp) => resp.json()) .catch(() => { return { country: 'us', }; }) 
        .then((resp) => callback(resp.country)); 
        };

            
$(document).ready( function(event){

    var phoneInputField = document.getElementById("phonenumber");
    const phoneInput = window.intlTelInput(phoneInputField, { initialCountry: "auto", geoIpLookup: getIp, utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"});
    var enterbtn = $("#enter");
    enterbtn.prop("disabled", true)
    $("#phonenumber").keyup((event)=>{
        
        //send Request
        
        $.ajax({
            url:"/check_number",
            type:"POST",
            data : {"phone": phoneInput.getNumber()+""},
            success: (xhr, status, response)=>{
                
                var phonedata = JSON.parse(response.responseText+"").validity.data;
                var hint = $("#invalidtext");
                
                
                if(phonedata == "neither") {
                    hint.addClass("d-none");
                    
                    enterbtn.prop("disabled", true)
                    
                }else if(phonedata == "false"){
                    hint.addClass(" bi bi-x text-danger")
                    .text("This is not an Airtel Number")
                    .removeClass("d-none text-success bi bi-patch-check-fill");
                    
                    enterbtn.prop("disabled", true)
                    
                }else if(phonedata == "true"){
                    hint.removeClass("d-none bi bi-x text-danger").addClass("text-success bi bi-patch-check-fill")
                    .text(" Airtel Number is Valid");
                    
                    enterbtn.prop("disabled", false)
                    
                }else{
                
                    enterbtn.prop("disabled", true)
                    
                };
            },
            error: (xhr, status, response)=>{
                
                alert("error")
            }
        });
    });
});
       