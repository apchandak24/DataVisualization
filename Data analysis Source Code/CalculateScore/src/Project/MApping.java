package mandarproject;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map.Entry;

public class MApping {
	public static HashMap<String,Double> PopulateTagMap() throws IOException{
		HashMap<String,Double> tagMap = new HashMap<String, Double>();
		String path="C:\\Users\\Rajat\\Desktop\\Project\\Project\\stackoverflow\\tags.txt";
		BufferedReader br = new BufferedReader(new FileReader(path));
		String line="";
		while((line=br.readLine())!=null){
			String tag = line.toString().trim();
			//System.out.println(tag);
			
			tagMap.put(tag, 1.0);
		}
		/*for(Entry<String,Integer> entry: tagMap.entrySet()){
			System.out.println("Tag: "+entry.getKey()+" Value: "+entry.getValue());
		}
		System.out.println("Size: "+tagMap.size());*/
		br.close();
		
		return tagMap;
	}
	
}
