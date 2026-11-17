import Flutter
import UIKit
import FirebaseCore
import FirebaseMessaging

@main
@objc class AppDelegate: FlutterAppDelegate, FlutterImplicitEngineDelegate {
  private let blaoTelemetryChannelName = "com.tramblao.chamcong/station_telemetry"

  override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
  ) -> Bool {
    FirebaseApp.configure()
    UIDevice.current.isBatteryMonitoringEnabled = true

    if #available(iOS 10.0, *) {
      UNUserNotificationCenter.current().delegate = self as UNUserNotificationCenterDelegate
    }

    application.registerForRemoteNotifications()

    let result = super.application(application, didFinishLaunchingWithOptions: launchOptions)
    configureBlaoStationTelemetryChannel()
    return result
  }

  private func configureBlaoStationTelemetryChannel() {
    guard let controller = window?.rootViewController as? FlutterViewController else {
      return
    }
    let channel = FlutterMethodChannel(
      name: blaoTelemetryChannelName,
      binaryMessenger: controller.binaryMessenger
    )
    channel.setMethodCallHandler { (call: FlutterMethodCall, result: @escaping FlutterResult) in
      switch call.method {
      case "getStationDeviceSnapshot":
        let device = UIDevice.current
        let tz = TimeZone.current
        let thermalState: String
        switch ProcessInfo.processInfo.thermalState {
        case .nominal: thermalState = "nominal"
        case .fair: thermalState = "fair"
        case .serious: thermalState = "serious"
        case .critical: thermalState = "critical"
        @unknown default: thermalState = "unknown"
        }
        let payload: [String: Any] = [
          "brandEcosystem": "TRAM_BLAO_HIGHLAND",
          "bundleId": Bundle.main.bundleIdentifier ?? "com.tramblao.chamcong",
          "deviceModel": device.model,
          "systemName": device.systemName,
          "systemVersion": device.systemVersion,
          "timeZoneId": tz.identifier,
          "utcOffsetHours": tz.secondsFromGMT() / 3600,
          "batteryLevel": Int((device.batteryLevel >= 0 ? device.batteryLevel : 1.0) * 100),
          "thermalState": thermalState
        ]
        result(payload)
      default:
        result(FlutterMethodNotImplemented)
      }
    }
  }

  func didInitializeImplicitFlutterEngine(_ engineBridge: FlutterImplicitEngineBridge) {
    GeneratedPluginRegistrant.register(with: engineBridge.pluginRegistry)
  }

  override func application(
    _ application: UIApplication,
    didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data
  ) {
    if FirebaseApp.app() != nil {
      Messaging.messaging().apnsToken = deviceToken
    }
    super.application(application, didRegisterForRemoteNotificationsWithDeviceToken: deviceToken)
  }
}
