package Users;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashSet;

public class uniqueUsers {
	
	static HashSet<String> userMap = new HashSet<String>();
	
	public static void main(String[] args) throws IOException{
		for(int i=1;i<=1;i++){
			String path="C:\\Users\\Rajat\\Desktop\\Project\\Project\\stackoverflow\\01_01_2014-12_31_2014["+i+"].csv";
			System.out.println("File : "+i);
			getUniqueUsers(path);
		}
		printSet();
	}
	
	
	public static void printSet(){
		int count=1;
		System.out.println(userMap.size());
		/*for(String userId: userMap){
			//HttpRequest.getData(userId);
		}*/
	}
	
	public static void getUniqueUsers(String path) throws IOException{
		BufferedReader br = new BufferedReader(new FileReader(path));
		String line="";
		line=br.readLine();
		while((line=br.readLine())!=null){
			 String values[] = line.split(",");
			 if(values[0].toString().trim().equals("answer") || values[0].toString().trim().equals("accepted-answer")){
				 String userId = values[5].toString().trim();
				 userMap.add(userId);
			 }
		}
	}
}
