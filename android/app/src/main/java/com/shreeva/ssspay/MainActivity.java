package com.shreeva.ssspay;

import static com.shreeva.ssspay.RdIntegration.sendData;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.capacitorjs.plugins.geolocation.GeolocationPlugin;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
//import com.ahm.capacitor.biometric.BiometricAuth;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.FirebaseFirestore;
import com.pantrist.firebase.dynamiclinks.CapacitorFirebaseDynamicLinks;

import ch.byrds.capacitor.contacts.Contacts;

import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;

public class MainActivity extends BridgeActivity {
  public static final String NAME = "RdServices";
  public static final int RDINFO_CODE = 1;
  public static final int RDCAPTURE_CODE = 2;
  private final String SUCCESS = "SUCCESS";
  private final String FAILURE = "FAILURE";
  private String PckName = "";
//  private Promise promise;
  private Map<String, Object> logging = new HashMap<>();
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    registerPlugin(RdIntegration.class);
    registerPlugin(PaysprintOnboarding.class);
    registerPlugin(GeolocationPlugin.class);
    registerPlugin(CapacitorFirebaseDynamicLinks.class);
    registerPlugin(GoogleAuth.class);
    registerPlugin(com.capacitorjs.plugins.camera.CameraPlugin.class);
    registerPlugin(Contacts.class);
  }

  @Override
  protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    if (requestCode != 0){
      if (requestCode == 2) {
        if (resultCode == RESULT_OK) {
          Bundle b = data.getExtras();
          if (b != null && b.containsKey("PID_DATA")) {
            String pidData = b.getString("PID_DATA");
            String dnc = b.getString("DNC", "");
            String dnr = b.getString("DNR", "");
            logging.put("PID", pidData);
            sendData(logging.toString());
//            showLogInfoDialog("DBXL Fingerprint Data:" + pidData, dnc + " --- " + dnr);
          }
        }
      }
      if (requestCode == 1){
        if (resultCode == RESULT_OK) {
//      showLogInfoDialog("DBXL DATA:", data.getDataString());
          Bundle b = data.getExtras();
          if (b != null && b.containsKey("RD_SERVICE_INFO")) {
            String deviceInfo = b.getString("DEVICE_INFO", "");
            String rdServiceInfo = b.getString("RD_SERVICE_INFO", "");
            String dnc = b.getString("DNC", "");
            String dnr = b.getString("DNR", "");
            if (!dnc.isEmpty() || !dnr.isEmpty()) {
//          showLogInfoDialog("DBXL Device Info", dnc + dnr + " " + deviceInfo + rdServiceInfo);
              sendData( dnc + dnr + "|" + deviceInfo +"|"+ rdServiceInfo);
            } else {
//          showLogInfoDialog("DBXL Device Info", deviceInfo + rdServiceInfo);
              sendData(deviceInfo +"|"+ rdServiceInfo);
            }
          }
        }
      }
    }
  }

  void showLogInfoDialog(String data, String dbase) {
    Map<String, Object> loggingDT = new HashMap<>();
    loggingDT.put("data",data + dbase);
    if (data.startsWith("DBXL Fingerprint Data")){
      FirebaseFirestore db = FirebaseFirestore.getInstance();
          db.collection("cities").add(loggingDT).addOnSuccessListener(new OnSuccessListener<DocumentReference>() {
            @Override
            public void onSuccess(DocumentReference documentReference) {
              showLogInfoDialog("DocumentSnapshot written with ID: " + documentReference.getId(),"DATA");
            }
          })
              .addOnFailureListener(new OnFailureListener() {
                @Override
                public void onFailure(@NonNull Exception e) {
                  showLogInfoDialog( "Error adding document", e.toString());
                }
              });
    }
    Context context = getApplicationContext();
    CharSequence text = data + dbase;
    int duration = Toast.LENGTH_LONG;
    Toast toast = Toast.makeText(context, text, duration);
    toast.show();
  }

  void getFingerPrint(String type) {
    Context context = getApplicationContext();
    CharSequence text = type;
    int duration = Toast.LENGTH_LONG;
    Toast toast = Toast.makeText(context, text, duration);
    toast.show();
    if (Objects.equals(type, "morpho")){
      System.out.println("RDTYPE "+type);
      Intent intent = new Intent("in.gov.uidai.rdservice.fp.CAPTURE");
      intent.setPackage("com.scl.rdservice");
      String responseXml = "<?xml version=\"1.0\"?><PidOptions ver=\"2.0\"><Opts fCount=\"1\" fType=\"2\" iCount=\"0\" pCount=\"0\" format=\"0\" pidVer=\"2.0\" timeout=\"10000\" env=\"P\" /><CustOpts></CustOpts></PidOptions>";
      intent.putExtra("PID_OPTIONS", responseXml);
      startActivityForResult(intent, 2);
    } else if (Objects.equals(type, "mantra")) {
      System.out.println("RDTYPE "+type);
      Intent intent = new Intent("in.gov.uidai.rdservice.fp.CAPTURE");
      intent.setPackage("com.mantra.rdservice");
      String responseXml = "<?xml version=\"1.0\"?><PidOptions ver=\"2.0\"><Opts fCount=\"1\" fType=\"2\" iCount=\"0\" pCount=\"0\" format=\"0\" pidVer=\"2.0\" timeout=\"10000\" env=\"P\" /><CustOpts></CustOpts></PidOptions>";
      intent.putExtra("PID_OPTIONS", responseXml);
      startActivityForResult(intent, 2);
    } else if (Objects.equals(type,"startek")){
      System.out.println("RDTYPE "+type);
      Intent intent = new Intent("in.gov.uidai.rdservice.fp.CAPTURE");
      intent.setPackage("com.acpl.registersdk");
      String responseXml = "<?xml version=\"1.0\"?><PidOptions ver=\"2.0\"><Opts fCount=\"1\" fType=\"2\" iCount=\"0\" pCount=\"0\" format=\"0\" pidVer=\"2.0\" timeout=\"10000\" env=\"P\" /><CustOpts></CustOpts></PidOptions>";
      intent.putExtra("PID_OPTIONS", responseXml);
      startActivityForResult(intent, 2);
    } else {
      System.out.println("RDTYPE None "+type);
    }
  }

  public void getDevicesInfo() {
    Intent intent = new Intent("in.gov.uidai.rdservice.fp.INFO");
    intent.setPackage("com.scl.rdservice");
    System.out.println("log1234: Started");
    startActivityForResult(intent, 1);
    Context context = getApplicationContext();
    CharSequence text = "Started Getting Data! ";
    int duration = Toast.LENGTH_SHORT;
    Toast toast = Toast.makeText(context, text, duration);
    toast.show();
    System.out.println("log1234: Start Complete");
  }

  public String deviceInfo() {
    try {
      Intent intent = new Intent();
      intent.setAction("in.gov.uidai.rdservice.fp.INFO");
      startActivityForResult(intent, RDINFO_CODE);
    } catch (Exception e) {
      e.printStackTrace();
      return "RD services not available";
    }
    return "FAILED";
  }

  public String captureData() {
    String pidOption = "<?xml version=\"1.0\"?><PidOptions ver=\"1.0\"><Opts fCount=\"1\" fType=\"0\" iCount=\"0\" pCount=\"0\" format=\"0\" pidVer=\"2.0\" timeout=\"10000\" posh=\"UNKNOWN\" env=\"P\" /><CustOpts></CustOpts></PidOptions>";
    Intent intent = new Intent();
    intent.setAction("in.gov.uidai.rdservice.fp.CAPTURE");
    intent.putExtra("PID_OPTIONS", pidOption);
    if (PckName.equalsIgnoreCase("com.scl.rdservice")) {
      intent.setPackage("com.scl.rdservice");
    } else if (PckName.equalsIgnoreCase("com.mantra.rdservice")) {
      intent.setPackage("com.mantra.rdservice");
    } else if (PckName.equalsIgnoreCase("com.precision.pb510.rdservice")) {
      intent.setPackage("com.precision.pb510.rdservice");
    } else if (PckName.equalsIgnoreCase("com.secugen.rdservice")) {
      intent.setPackage("com.secugen.rdservice");
    } else if (PckName.equalsIgnoreCase("com.acpl.registersdk")) {
      intent.setPackage("com.acpl.registersdk");
    } else if (PckName.equalsIgnoreCase("co.aratek.asix_gms.rdservice")) {
      intent.setPackage("co.aratek.asix_gms.rdservice");
    } else {
      return "RD services Package not found";
    }

    try {
      startActivityForResult(intent, RDCAPTURE_CODE);
    } catch (Exception e) {
      e.printStackTrace();
      return "Selected device not found";
    }
    return "FAILED";
  }
  public void startOnboarding(String merchantCode,String mobile,String lat, String lng,String email){
    Intent intent = new Intent();
    intent.putExtra("pId", "PS00716");
    intent.putExtra("pApiKey", "UFMwMDcxNmI5YWIzN2YyZDMzZWM3NDg5YjkzYzAyOGE2ZmNmZDIw");
    intent.putExtra("mCode", merchantCode); //merchant unique code and should not contain special character
    intent.putExtra("mobile", mobile); // merchant mobile no.
    intent.putExtra("lat", lat);
    intent.putExtra("lng", lng);
    intent.putExtra("firm", "SSSPAY");
    intent.putExtra("email", email);
    intent.addFlags(Intent.FLAG_ACTIVITY_NO_ANIMATION);
    startActivityForResult(intent, 999);
  }
}
