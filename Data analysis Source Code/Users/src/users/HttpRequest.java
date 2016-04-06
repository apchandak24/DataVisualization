package Users;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.HashMap;
import java.util.zip.GZIPInputStream;
import org.json.JSONException;
import org.json.JSONObject;


public class HttpRequest {
	
	static HashMap<String,String> userIDNameMap = new HashMap<String,String>();
	
	public static void main(String[] args) throws IOException {
		getData("2206192");
		
        }
	
	public static void getData(String userID){
		try {
		    URLConnection connection = new URL("https://api.stackexchange.com/2.2/users/"+userID+"?order=desc&sort=reputation&site=stackoverflow&key=WI9smiBPEy0easOTLBWUkQ((").openConnection();                        
		    String html = "";
		    BufferedReader in = null;
		    connection.setReadTimeout(10000);
		    in = new BufferedReader(new InputStreamReader(new GZIPInputStream(connection.getInputStream())));                   
		    String inputLine;
		    while ((inputLine = in.readLine()) != null){
		    html+=inputLine+"\n";
		    }
		    in.close();
		    //System.out.println(html);
		    parseString(html);
		  //  parseStringToJSON(html);
		    
		} catch (IOException ex) {
			ex.printStackTrace();
		}
	}
	
	
	private static void parseStringToJSON(String html) {
		try {
			JSONObject jsonObject = new JSONObject(html);
			String userName = jsonObject.getString("display_name");
			System.out.println(userName);
			
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}



	public static void parseString(String json){
		String userData[]= json.split("\"display_name\":");
		int index = userData[1].indexOf(",");
		String name =userData[1].substring(1, index-1);
		String userId[] = userData[0].split("\"user_id\":");
		int userIdIndex = userId[1].indexOf(",");
		String userID = userId[1].substring(0, userIdIndex-1);
		System.out.println(userID+" "+name);
		userIDNameMap.put(userID,name);		
	}
	
	
 }


