package com.shreeva.ssspay;

import android.widget.Toast;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "Onboarding")
public class PaysprintOnboarding extends Plugin {
  private static PluginCall mainCall;

  @PluginMethod()
  public void startOnboarding(PluginCall call) throws InterruptedException {
    mainCall = call;
    var phone = call.getString("phone");
    var email = call.getString("email");
    var uid = call.getString("merchantCode");
//    Toast.makeText((MainActivity) getActivity(),"Phone"+phone,Toast.LENGTH_LONG).show();
    ((MainActivity) getActivity()).startOnboarding(
     uid,
     phone,
     email
    );
    call.setKeepAlive(true);
  }

  public void finishOnboarding(JSObject object){
    mainCall.resolve(object);
  }


}
