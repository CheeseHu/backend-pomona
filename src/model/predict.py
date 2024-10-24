import sys
import joblib

def predict(data):
    # Load the model
    model = joblib.load('svm_model.pkl')
    # Make a prediction
    prediction = model.predict([data])
    return prediction[0]

if __name__ == "__main__":
    # Read data from command line arguments
    input_data = [float(x) for x in sys.argv[1:]]
    result = predict(input_data)
    print(result)
