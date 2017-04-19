from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
	return render_template('chart.html')

@app.route('/data')
def data();
	
	users = mongo.db.users
	results = users.find_one({'reord' : '1'})

	return jsonify({'results' : result['sugarblood']})

if __name__=='__main__':
	app.run(debug=True)