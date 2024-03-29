#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import <Firebase.h>
#import "RNSplashScreen.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"FoodPicker";
  // You can add your custom initial props in the dictionary below.
  [FIRApp configure];
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  
  BOOL didFinishLaunchingWithOptions = [super application:application didFinishLaunchingWithOptions:launchOptions];

  //SPLASH SCREEN NEEDS TO COME AFTER ALL JS FILES ARE LOADED 
  //THAT'S WHY IT WAS NOT BEING CLOSED BECUASE THE ACTUAL RNSPLASHCREEN LIBRARY FILES WERE NOT LOADED YET
  [RNSplashScreen show];

  return didFinishLaunchingWithOptions;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

/// This method controls whether the `concurrentRoot`feature of React18 is turned on or off.
///
/// @see: https://reactjs.org/blog/2022/03/29/react-v18.html
/// @note: This requires to be rendering on Fabric (i.e. on the New Architecture).
/// @return: `true` if the `concurrentRoot` feature is enabled. Otherwise, it returns `false`.
- (BOOL)concurrentRootEnabled
{
  return true;
}

@end
