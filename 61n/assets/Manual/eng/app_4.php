<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0",user-scalable=no />
<meta name="format-detection" content="telephone=no, address=no, email=no" />
<title>61N Manual</title>
<link rel="stylesheet" href="../../css/common.css" type="text/css">
<link rel="stylesheet" href="../../css/fontstyle.css" type="text/css">
<link rel="stylesheet" href="../../css/manual.css" type="text/css">
<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">

<link rel="stylesheet" type="text/css" href="../../css/powerlistmenu.css" />

<!--[if lte IE 8]>
<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>

<script src="../../js/powerlistmenu.js"></script>

<script type="text/javascript">

var powerinstance

jQuery(function($){ // on DOM load
	powerinstance = new Powerlistmenu({
		menuid: 'powermenu1' // id of main nav container
	})
})

</script>
<style>
@import url('http://fonts.googleapis.com/earlyaccess/nanumgothic.css');
</style>
</head>

<body>
<? include_once ("../../include/top_manual.php"); ?>
<div class="wrap">

<h1>MANUAL</h1>
    <div class="contents clearfix">
        <div class="dir"><p><a href="main.php">61N Manual</a> <span> &gt; </span> <a href="app_1.php">Examine App.</a> <span> &gt; </span> <strong>Viewing Photo</strong></p></div>
        <div class="left clearfix">
            <nav id="powermenu1" class="powerlistmenu">
            <ul class="lmenu">
                <li><a href="main.php">Use 61N First Time</a>
                	<!--ul class="lmenu">
                      <li><a href="main.html">앱 설치하기</a></li>
                      <li><a href="main.html">계정생성</a></li>
                      <li><a href="main.html">카메라 연동하기</a></li>
                      <li><a href="main.html">사진 등록하기</a></li>
                    </ul-->
                </li>
                <li><a href="camera_1.php">How to Use Camera</a>
                    <ul class="lmenu">
                      <li><a href="camera_1.php">Power</a>
                      	<ul class="lmenu">
                        	<li><a href="camera_1.php">Turn on Camera</a></li>
                            <li><a href="camera_1.php">Turn off Camera</a></li>
                            <li><a href="camera_1.php">Reset Camera</a></li>
                        </ul>
                      </li>
                      <li><a href="camera_2.php">Photographing</a>
                      	<ul class="lmenu">
                        	<li><a href="camera_2.php">Automatic Photographing</a></li>
                            <li><a href="camera_2.php">Manual Photographing</a></li>
                        </ul>
                      </li>
                      <li><a href="camera_3.php">Video</a>
                      	<ul class="lmenu">
                        	<li><a href="camera_3.php">Video Recording</a></li>
                        </ul>
                      </li>
                      <li><a href="camera_4.php">Recharging</a></li>
                      <li><a href="camera_5.php">Backup</a></li>
                      <li><a href="camera_6.php">Camera Battery</a></li>
                      <li><a href="camera_7.php">Camera Memory</a></li>
                    </ul>
                </li>
                <li class="on"><a href="app_1.php">Examine App.</a>
                    <ul class="lmenu">
                      <li><a href="app_1.php">Starting</a>
                      	<ul class="lmenu">
                        	<li><a href="app_1.php">Account Creation</a></li>
                            <li><a href="app_1.php">Log In</a></li>
                            <li><a href="app_1.php">Find Password</a></li>
                        </ul>
                      </li>
                      <li><a href="app_2.php">Examining</a>
                      	<ul class="lmenu">
                        	<li><a href="app_2.php">Examine Basic Screen</a></li>
                            <li><a href="app_2.php">Profile Bar</a></li>
                            <li><a href="app_2.php">Menu Bar</a></li>
                            <li><a href="app_2.php">Time Line</a></li>
                        </ul>
                      </li>
                      <li><a href="app_3.php">Photo Registration</a>
                        <ul class="lmenu">
                        	<li><a href="app_3.php">Transmit Photos</a></li>
                            <li><a href="app_3.php">Android</a></li>
                            <li><a href="app_3.php">iOS</a></li>
                        </ul>
                      </li>
                      <li class="on"><a href="app_4.php">Viewing Photo</a>
                      	<ul class="lmenu">
                        	<li><a href="app_4.php">View by Place</a></li>
                            <li><a href="app_4.php">Gather by Date</a></li>
                            <li><a href="app_4.php">Gather by Month</a></li>
                            <li><a href="app_4.php">Gather by Lattice</a></li>
                            <li><a href="app_4.php">View in Detail</a></li>
                            <li><a href="app_4.php">Link Emotion Tag</a></li>
                            <li><a href="app_4.php">Link Hash Tag</a></li>
                            <li><a href="app_4.php">Share</a></li>
                            <li><a href="app_4.php">Download</a></li>
                            <li><a href="app_4.php">Delete</a></li>
                        </ul>
                      </li>
                    </ul>
                </li>
                <li><a href="">61N Menu - Timeline</a>
                    <ul class="lmenu">
                      <li><a href="timeline_1.php">Examining Time Line</a>
                      	<ul class="lmenu">
                        	<li><a href="timeline_1.php">Examine</a></li>
                            <li><a href="timeline_1.php">Profile Bar</a></li>
                            <li><a href="timeline_1.php">Expand Profile Bar</a></li>
                            <li><a href="timeline_1.php">Register photos saved in own smartphone in Time Line</a></li>
                            <li><a href="timeline_1.php">Live View</a></li>
                            <li><a href="timeline_1.php">View Statistics</a></li>
                            <li><a href="timeline_1.php">Photo Story</a></li>
                        </ul>
                      </li>
                      <li><a href="timeline_2.php">Viewing WITH</a>
                      	<ul class="lmenu">
                        	<li><a href="timeline_2.php">View WITH Time Line</a></li>
                            <li><a href="timeline_2.php">View HELLO</a></li>
                            <li><a href="timeline_2.php">View GOODBYE</a></li>
                            <li><a href="timeline_2.php">View WITH Statistics</a></li>
                        </ul>
                      </li>
                      <li><a href="timeline_3.php">Using Multi-mode</a></li>
                    </ul>
                </li>
                <li><a href="">61N Menu - F/F Album</a>
                	<ul class="lmenu">
                      <li><a href="fnf_1.php">F/F Album</a>
                      	<ul class="lmenu">
                        	<li><a href="fnf_1.php">Examine F/F Album</a></li>
                            <li><a href="fnf_1.php">View F/F Member</a></li>
                            <li><a href="fnf_1.php">View All F/F Photos</a></li>
                            <li><a href="fnf_1.php">View My Own Posted Photos only</a></li>
                            <li><a href="fnf_1.php">View Photos for each F/F Member</a></li>
                            <li><a href="fnf_1.php">Register F/F Member</a></li>
                        </ul>
                      </li>
                      <li><a href="fnf_2.php">Viewing F/F Photo</a></li>
                    </ul>
                </li>
                <li><a href="">61N Menu - Footprint</a>
                	<ul class="lmenu">
                      <li><a href="footprint_1.php">Viewing Photo per Place</a>
                      	<ul class="lmenu">
                        	<li><a href="footprint_1.php">View on Map Screen</a></li>
                            <li><a href="footprint_1.php">View by Lattice</a></li>
                            <li><a href="footprint_1.php">View in Detail</a></li>
                        </ul>
                      </li>
                      <li><a href="footprint_2.php">Checking My Position</a></li>
                    </ul>
                </li>
                <li><a href="">61N Menu - Setting</a>
                	<ul class="lmenu">
                      <li><a href="setting_1.php">Setting Account</a>
                      	<ul class="lmenu">
                        	<li><a href="setting_1.php">Register Profile Photo</a></li>
                            <li><a href="setting_1.php">Register Name</a></li>
                            <li><a href="setting_1.php">Set Birthday</a></li>
                            <li><a href="setting_1.php">Set Sex</a></li>
                            <li><a href="setting_1.php">Switch from Facebook Account to 61N Account</a></li>
                            <li><a href="setting_1.php">Change Password</a></li>
                            <li><a href="setting_1.php">Withdraw Membership</a></li>
                        </ul>
                      </li>
                      <li><a href="setting_2.php">Setting WITH</a>
                      	<ul class="lmenu">
                        	<li><a href="setting_2.php">Send WITH Code</a></li>
                            <li><a href="setting_2.php">Register WITH Code</a></li>
                            <li><a href="setting_2.php">Cancel WITH</a></li>
                        </ul>
                      </li>
                      <li><a href="setting_3.php">Setting F/F</a>
                      	<ul class="lmenu">
                        	<li><a href="setting_3.php">Send F/F Code</a></li>
                            <li><a href="setting_3.php">Register F/F Code</a></li>
                            <li><a href="setting_3.php">Cancel F/F</a></li>
                        </ul>
                      </li>
                      <li><a href="setting_4.php">Setting Camera</a>
                      	<ul class="lmenu">
                        	<li><a href="setting_4.php">Register Camera</a></li>
                            <li><a href="setting_4.php">Change Photographing Internal</a></li>
                            <li><a href="setting_4.php">Change Recording Time</a></li>
                        	<li><a href="setting_4.php">Change Photo Resolution</a></li>
                            <li><a href="setting_4.php">Use Position Information</a></li>
                            <li><a href="setting_4.php">Update Firmware</a></li>
                        	<li><a href="setting_4.php">Default Camera</a></li>
                            <li><a href="setting_4.php">Cancel Camera</a></li>
                        </ul>
                      </li>
                      <li><a href="setting_5.php">Setting Theme</a></li>
                      <li><a href="setting_6.php">Viewing Cloud Capacity</a></li>
                      <li><a href="setting_7.php">Setting Notice</a></li>
                      <li><a href="setting_8.php">Setting Mobile Data Use</a></li>
                      <li><a href="setting_9.php">Viewing Help</a></li>
                      <li><a href="setting_10.php">Viewing Policy &amp; Terms</a></li>
                      <li><a href="setting_11.php">Viewing Announcement</a></li>
                    </ul>
                </li>
            </ul>
            </nav>
        </div>
        <div class="cright clearfix">
        	<!-- Write contents here -->
            <h2>Viewing Photo</h2>
            <h3>View by Place</h3><!-- Sub title -->
            <p>Photos taken with 61N will basically be registered in the Time Line based on the position where photo is taken. Photos taken at the same place will be displayed on the Time Line as a bundle. </p>
			<h3>Gather by Date</h3><!-- Sub title -->
            <p>If flicking the view screen to the left for each place, photos taken on the corresponding date will be arranged by day. All photos and videos taken with 61N on the corresponding date will be displayed as a bundle that is classified by day. </p>
            <h3>Gather by Month</h3><!-- Sub title -->
            <p>If flicking the view screen to the left for each day, photos taken on the corresponding month will be arranged by month. All photos and videos taken with 61N on the corresponding month will be displayed as a bundle that is classified by month.</p>
            <h3>Gather by Lattice</h3><!-- Sub title -->
            <p>If touching the preview screen of bundle displayed on the Time Line, a lattice type preview screen will display photos included in each bundle. In the lattice type preview screen, it is possible to select desired photos in duplicate for a batch download. It is also possible to select undesirable photos in duplicate for a batch deletion. </p>
            <h3>View in Detail</h3><!-- Sub title -->
            <p>If touching the preview of lattice type preview screen, a detail view screen will appear where corresponding photos can be seen through a whole screen. You may appreciate previous and next photos by flicking the detail view screen to left or right. In the detail view screen, such functions can be used as emotion tag, hash tag, share, download, and photo deletion.</p>
            <h3>Link Emotion Tag</h3><!-- Sub title -->
            <p>If touching the emotion tag link icon on the first function bar at the bottom of screen, my own emotion can be displayed on the corresponding photo. If touching the facial expression that represents emotion, the corresponding icon will be registered in the photo. If touching the registered icon once again, the registration will be cancelled. Motion icon can not be registered in duplicate.</p>
            <h3>Link Hash Tag</h3><!-- Sub title -->
            <p>If touching the hash tag link icon on the second function bar at the bottom of screen, the hash tag can be registered in the corresponding photo. If touching the hash tag link icon, an input bar will appear that can enter the hash tag on top of detail view screen. If touching the input bar, a keyboard will appear, and desired hash tag can be entered to register. Registered hash tag will be displayed on top of detail view screen, and can be registered in duplicate. In order to delete the registered hash tag, the corresponding hash tag will be deleted by touching a hash tag link icon and each 'x' button displayed on the right side of registered hash tag.</p>
            <h3>Share</h3><!-- Sub title -->
            <p>If touching the share icon on the third function bar at the bottom of screen, the corresponding photo can be shared. There are three paths to share.</p>

            <h4>1. Sharing in Time Line</h4>
            <p>It is a function to provide ‘WITH’ only for the registered user. It is possible to present photos registered with 'WITH' in the Time Line of partner. In order to cancel my own photos that share in the Time Line of 'WITH' partner, it is possible to cancel the share by touching a ’Time Line SHARING‘ button once more.</p>
            
            <h4>2. Sharing in F/F Album</h4>
            <p>It is possible to share the corresponding photos of family and friends in F/F Album. (if there is no registered F/F member, photos will be displayed on my own F/F Album.) In order to cancel my own photos that shares in F/F Album, it is possible to cancel the share by touching a ‘SHARE in F/F ALBUM’ button once more.</p>
            
            <h4>3. Sharing in social media</h4>
            <p>It is possible to share the corresponding photos in social medium (Facebook, Twitter, Kakao Talk) installed in my own smartphone.</p>
            
            <h3>Download</h3><!-- Sub title -->
            <p>If touching the download icon on the fourth function bar at the bottom of screen, it is possible to download corresponding photos to my smartphone. Downloaded photos will be saved in my own photo App.</p>
            <h3>Delete</h3><!-- Sub title -->
            <p>If touching the deletion icon on the fifth function bar at the bottom of screen, it is possible to delete the corresponding photo.</p>

            <p>&nbsp;</p>
            <!-- // Write contents here -->
        </div>
    </div>
    <div class="footer">
        <div class="other-menu">
        	<ul>
                <li>FAQ</li>
                <li>1:1 Q&amp;A</li>
            	<li class="on">Manual</li>
            	<li>Career</li>
            	<li>About Us</li>
            </ul>
        </div>
        <div class="copy">&copy; 2016 BNS Korea Co., LTD.</div>
    </div>
</div>
</body>
</html>
