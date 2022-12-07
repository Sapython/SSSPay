package com.shreeva.ssspay;

import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "Onboarding")
public class PaysprintOnboarding extends Plugin {
  private static PluginCall mainCall;

  @PluginMethod()
  public void startOnboarding(PluginCall call) throws InterruptedException {
    PluginCall mainCall = call;
    String value = call.getString("value");
    ((MainActivity) getActivity()).startOnboarding(
     call.getString("merchantCode"),
     call.getString("mobile"),
     call.getString("lat"),
     call.getString("lng"),
     call.getString("email")
    );
    call.setKeepAlive(true);
  }

}
