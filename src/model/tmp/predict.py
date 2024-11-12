# Import thư viện
import json
import os
import sys
import warnings
import pandas as pd
import numpy as np
import pickle

current_working_directory = os.getcwd() 
tmp_folder = os.path.join(current_working_directory, 'src', 'model', 'tmp')

with open(os.path.join(tmp_folder, 'svm_model.pkl'), 'rb') as f:
    svm_model = pickle.load(f)

with open(os.path.join(tmp_folder, 'xgb_model.pkl'), 'rb') as f:
    xgb_model = pickle.load(f)

# Parse JSON input from command line 
type = json.loads(sys.argv[1]) 
input_data = json.loads(sys.argv[2]) 
x = np.array(input_data["signal"]).reshape(1,228)

# print(x.shape)
predict = None
if type == 1:
    warnings.filterwarnings("ignore", message="X does not have valid feature names")
    predict = svm_model.predict(x)

if type == 2:
    predict = xgb_model.predict(x)

print(predict)