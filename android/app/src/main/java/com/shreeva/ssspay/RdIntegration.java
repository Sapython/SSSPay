package com.shreeva.ssspay;

import android.app.Activity;
import android.content.Intent;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "RdService")
public class RdIntegration extends Plugin {
  private static PluginCall mainCall;

  @PluginMethod()
  public void getDeviceInfo(PluginCall call) throws InterruptedException {
    mainCall = call;
    String value = call.getString("value");
    ((MainActivity) getActivity()).getDevicesInfo();
    // ((MainActivity)getActivity()).getFingerPrint();
    call.setKeepAlive(true);
  }

  @PluginMethod()
  public void getFingerPrint(PluginCall call) throws InterruptedException {
    String type = call.getString("value");
    mainCall = call;
    String value = call.getString("type");
    // ((MainActivity) getActivity()).getDevicesInfo();
    ((MainActivity)getActivity()).getFingerPrint(value);
    call.setKeepAlive(true);
  }

  public static void sendData(String data) {
    JSObject ret = new JSObject();
    ret.put("fingerprint", data);
    mainCall.resolve(ret);
  }
}
