import os
import time
#import rich
from flask import Flask, redirect, request, render_template, session, jsonify, url_for
from functools import partial, wraps
from markupsafe import Markup
import random
import phonenumbers
from phonenumbers import carrier

app = Flask(__name__)

app.config['SECRET_KEY'] = os.environ["SECRET_KEY"]

link = "https://chikraighotoops.com/4/8445099"
due_date = "15th of November, 2024"
annoying_ad = Markup("""<script src="https://alwingulla.com/88/tag.min.js" data-zone="111309" async data-cfasync="false"></script>""")

render = partial(render_template, link=link, due_date=due_date)

showornot = lambda : random.choice([0,0])


class AirtelParser:
   
   def __init__(self, number): 
      self.number = number
      self.parsed = self.parse_num(self.number)
      self.isvalid = self.is_available(self.parsed)
      self.carrier = self.getcarrier(self.parsed) 

   def get(self):
      return {"isvalid": str(self.isvalid), "carrier": self.carrier.lower()}
   
   def parse_num(self, number:str):
      return phonenumbers.parse(number)
      
   def is_available(self, parsed:int): 
      return phonenumbers.is_valid_number(parsed)
      
   def getcarrier(self, parsed:int):  
      try:
         return carrier.name_for_number(parsed, "en") 
      except: 
         return "Nooo"
         
class Counter: 
   def __init__(self, start: int): 
      self.start = start
      
   def countdown(self): 
      self.start -= 1
      return self.start
      
   def reset(self): 
      self.start = 0
      
counter = Counter(20)
       

@app.route("/")
def index():
   
   if showornot():
      return render("index.html", annoying_ads=annoying_ad)
   return render("index.html")
   
@app.route("/register")
def register():
   if showornot():
      return render("apply.html", annoying_ads=annoying_ad)
   return render("apply.html")
   

@app.route("/airtel_tasks/referral")
def refer():
   
   try: 
      num = session["user_number"]
   except:
      num = ""
      
   if showornot():
      return render("share.html", annoying_ads=annoying_ad, usernumber=num )
   return render("share.html", usernumber=num, ref=str(random.randint(10000, 999999)))
   
@app.route("/check_number", methods=["POST"]) 
def check():  
   if request.method == "POST": 
      num = request.form["phone"] 
      
      #PRINT
      #rich.print(f"[bold green]{num}[/bold green]")
      try:
         parser = AirtelParser(str(num)) 
      except: 
         return {"validity":{"data": "neither"}}
      res = parser.get() 
      
      #PRINT
      #rich.print_json(data=res)
         
      if res["isvalid"] and str(res["carrier"]).lower() =="airtel": 
         parsed_number = parser.parsed
         complete_number = f"+{parsed_number.country_code}{parsed_number.national_number}"
         session["user_number"] = complete_number
         #rich.print(session["user_number"])
         return jsonify({"validity":{"data":"true"}})
      return jsonify({"validity":{"data":"false"}})
   return jsonify({"validity":{"data":"false"}})
   
@app.route("/countdown", methods=["POST"])
def countdown():  
   if request.method == "POST": 
      data = request.form
      
      if data["countdown"]: 
         newtime = counter.countdown()
         return jsonify({"count":{"time": str(newtime)}})
      else:
         pass
         
@app.route("/ref/<refcode>")   
def ref(refcode): 
   return redirect(url_for("index"))
   
@app.errorhandler(404)
def notfound(error):
   return redirect(link)