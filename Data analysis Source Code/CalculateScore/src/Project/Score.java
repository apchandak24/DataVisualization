package mandarproject;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map.Entry;

public class Score {

	static HashMap<String, Double> tagMap = new HashMap<String, Double>();
	private static HashMap<String, HashMap<String, Stackoverflow>> ansMap = new HashMap<String, HashMap<String, Stackoverflow>>();

	public static void main(String[] args) throws IOException {
		//
		tagMap = MApping.PopulateTagMap();
		
		for(int i=1;i<=216;i++){
			String path="C:\\Users\\Rajat\\Desktop\\Project\\Project\\stackoverflow\\01_01_2014-12_31_2014["+i+"].csv";
			System.out.println("File : "+i);
			getJsonData(path);
		}
		createCSV(ansMap);
		AnswerStats.m1();
	}
	
	
	public static void createCSV(HashMap<String,HashMap<String,Stackoverflow>> ansMap) throws IOException{
		String newFilePath1="C:\\Users\\Rajat\\Desktop\\Project\\Project\\stackoverflow\\StackCSV8.csv";
		BufferedReader br =null;
		FileWriter fr1= new FileWriter(newFilePath1,true);
		fr1.append("Tag");
		fr1.append(',');
		fr1.append("UserID");
		fr1.append(',');
		fr1.append("Score");
		fr1.append(',');
		fr1.append("Reputation");
		fr1.append('\n');
		
			
			for(Entry<String,HashMap<String,Stackoverflow>> entry: ansMap.entrySet()){
				String tag = entry.getKey();
				
				HashMap<String,Stackoverflow> userMap = (HashMap<String,Stackoverflow>)entry.getValue();
				for(Entry<String,Stackoverflow> entry1:userMap.entrySet()){
					String userId= entry1.getKey();
					Stackoverflow stackObject = entry1.getValue();
					double score = stackObject.getScore();
					int reputation = stackObject.getReputation();
					fr1.append(tag);
					fr1.append(',');
					fr1.append(userId);
					fr1.append(',');
					fr1.append(score+"");
					fr1.append(',');
					fr1.append(reputation+"");
					fr1.append('\n');
				}
			}
			fr1.close();
			System.out.println("File Created");
	}

	public static void getJsonData(String path) throws IOException {
		double acc_ans = 0.5;
		double ans = 0.1;
		double vote = 0.4;
		double noOfVotes;
		//String path = "e:\\stack11.csv";
		BufferedReader br = new BufferedReader(new FileReader(path));
		String line = "";
		
		line = br.readLine();
		while ((line = br.readLine()) != null) {
			String[] values = line.split(",");
			String[] splitArray = values[10].toString().trim().split(" ");
			for (int i = 1; i < splitArray.length; i++) {
				String tagValue = splitArray[i];
				if (tagMap.containsKey(tagValue)) {
					if (values[0].toString().equals("accepted-answer")
							|| values[0].toString().equals("answer")) {
						noOfVotes = Double.parseDouble(values[7].toString()
								.trim());
						if (ansMap.containsKey(tagValue)) {
							HashMap<String, Stackoverflow> tempMap = ansMap
									.get(tagValue);
							if (tempMap
									.containsKey(values[5].toString().trim())) {
								if(values[0].equals("answer"))
									ans=0.1;
								else
									ans=0.5;
								Stackoverflow stackObject = tempMap.get(values[5].toString().trim());
								double score = stackObject.getScore();
								score = score + (1*ans) + (noOfVotes*0.4);
								
								int previousReputation =stackObject.getReputation();
								int newReputation = Integer.parseInt(values[8].toString().trim()) ;
								if(newReputation>previousReputation)
									stackObject.setReputation(newReputation);
								
								tempMap.put(values[5].toString().trim(), stackObject);
								ansMap.put(tagValue, tempMap);
							} else {
								Stackoverflow stackObject = new Stackoverflow();
								stackObject.setScore(1 + (noOfVotes*0.4));
								stackObject.setReputation(Integer.parseInt(values[8].toString().trim()));
								tempMap.put(values[5].toString().trim(),
										stackObject);
								ansMap.put(tagValue, tempMap);
							}
						} else {
							Stackoverflow stackObject = new Stackoverflow();
							stackObject.setScore(1 + (noOfVotes*0.4));
							stackObject.setReputation(Integer.parseInt(values[8].toString().trim()));
							HashMap<String, Stackoverflow> tempMap = new HashMap<String, Stackoverflow>();
							tempMap.put(values[5].toString().trim(),
									stackObject);
							ansMap.put(tagValue, tempMap);
						}
					}
				}
			}
		}
		br.close();
		
	}

}
