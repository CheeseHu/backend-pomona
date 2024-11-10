# Import essential packages
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from xgboost import XGBClassifier
from sklearn.metrics import classification_report, mean_squared_error
from sklearn.svm import SVC, SVR
import numpy as np
from sklearn.preprocessing import MinMaxScaler
import pickle
import os

# Load Input
current_working_directory = os.getcwd() 
tmp_folder = os.path.join(current_working_directory, 'src', 'model', 'tmp')
csv_file = os.path.join(tmp_folder, 'output.csv')
df = pd.read_csv(csv_file)

# Create Label Columns
df['type_code'] = df["file_name"].str[22:24]
df['status_code'] = df["file_name"].str[26:28]
data = df

# Choose Meat Type data to train: "01" - Beef; "02" - Pork.
data = data[data["type_code"] == "01"]

# Data
X = data.loc[:, 'sample_signal_1':'sample_signal_228']

# remap label: 1,2,3,5 -> 0,1,2,3
y = data['status_code'].astype('category').cat.codes

# Data Spliting
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.5, random_state=42)

svm_freshness = SVC(kernel='linear')
svm_freshness.fit(X_train, y_train)
y_fresh_pred = svm_freshness.predict(X_test)
print('SVM: ')
print(classification_report(y_test, y_fresh_pred))

rf_model = RandomForestClassifier(random_state=42)
rf_model.fit(X_train, y_train)
y_pred_rf = rf_model.predict(X_test)
print('Random Forest: ')
print(classification_report(y_test, y_pred_rf))

xgb_status = XGBClassifier(eval_metric='mlogloss', random_state=42) 
xgb_status.fit(X_train, y_train)
y_pred_status = xgb_status.predict(X_test)
print('XGB: ')
print(classification_report(y_test, y_pred_status))

with open(os.path.join(tmp_folder, 'svm_model.pkl'), 'wb') as f:
    pickle.dump(svm_freshness, f)
with open(os.path.join(tmp_folder, 'rf_model.pkl'), 'wb') as f:
    pickle.dump(rf_model, f)
with open(os.path.join(tmp_folder, 'xgb_model.pkl'), 'wb') as f:
    pickle.dump(xgb_status, f)