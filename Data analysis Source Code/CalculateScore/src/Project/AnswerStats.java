package mandarproject;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map.Entry;

public class AnswerStats {
	static HashMap<String, AnswerStatsJavaBean> answerStatsMap = new HashMap<String,AnswerStatsJavaBean>();
	//static HashMap<String, HashMap<String, AnswerStatsJavaBean> aMap = new Hash Map<String, HashMap<String, AnswerStatsJavaBean>>();

	public static void m1() throws IOException {		
		for(int i=1;i<=216;i++){
			String path="C:\\Users\\Rajat\\Desktop\\Project\\Project\\stackoverflow\\01_01_2014-12_31_2014["+i+"].csv";
			//String path="e:\\stack.csv";
			System.out.println("File : "+i);
			getData(path);
			printMap();
		}
	//createCSV(amap);
        }
	
	public static void printMap(){
		System.out.println("UserId"+"\t"+"Answers"+"\t"+"length"+"\t"+"Acc Ans"+"\t"+"length"+"\t"+"time");

		
		for(Entry<String,AnswerStatsJavaBean> entry: answerStatsMap.entrySet()){
			String userId= entry.getKey();
			AnswerStatsJavaBean statObject = entry.getValue();
			double avg_ans_length;
			double avg_acc_ans_length;
			if(statObject.getAnswerLength()==0)
				avg_ans_length=0;
			else
				avg_ans_length = statObject.getAnswerLength()/statObject.getAnswerCount();
			
			if(statObject.getAcceptedAnswerLength()==0)
				avg_acc_ans_length=0;
			else
				avg_acc_ans_length = statObject.getAcceptedAnswerLength()/statObject.getAcceptedAnswerCount();
			
			System.out.println(userId+"\t"+" "+statObject.getAnswerCount()+"\t"+avg_ans_length+"\t"
					+statObject.getAcceptedAnswerCount()+"\t"+avg_acc_ans_length+"\t"+statObject.getTime());
		}

	}	
	
	public static void getData(String path) throws IOException{
		//HashMap<String, AnswerStatsJavaBean> answerStatsMap = new HashMap<String,AnswerStatsJavaBean>();
		BufferedReader br = new BufferedReader(new FileReader(path));
		String line = "";
		line = br.readLine();
		line = br.readLine();                                                                                       	
		while ((line = br.readLine()) != null) {
			String values[] = line.split(",");
			if(values[0].toString().trim().equals("answer")||values[0].toString().trim().equals("accepted-answer"))
			if(answerStatsMap.containsKey(values[5].toString().trim())){
				AnswerStatsJavaBean statObject = answerStatsMap.get(values[5].toString().trim());
				if(values[0].toString().trim().equals("answer")){
					statObject.incrementAnswerCount();
					String answer = values[3].toString().trim()+values[4].toString().trim();
					double length = answer.length();
					statObject.setAnswerLength(length);
				}
				else if(values[0].toString().trim().equals("accepted-answer")){
					statObject.incrementAcceptedAnswerCount();
					String acceptedAnswer = values[3].toString().trim()+values[4].toString().trim();
					double length = acceptedAnswer.length();
					statObject.setacceptedAnswerLength(length);
				}
				long time = Long.parseLong(values[6].toString().trim());
				long previousTime = statObject.getTime();
				if(time>previousTime)
					statObject.setTime(time);
				answerStatsMap.put(values[5].toString().trim(), statObject);
						
			}
			else{
				AnswerStatsJavaBean statObject = new AnswerStatsJavaBean();
				if(values[0].toString().trim().equals("answer")){
					statObject.incrementAnswerCount();
					String answer = values[3].toString().trim();
					double length = answer.length();
					statObject.setAnswerLength(length);
				}
				else if(values[0].toString().trim().equals("accepted-answer")){
					statObject.incrementAcceptedAnswerCount();
					String acceptedAnswer = values[3].toString().trim();
					double length = acceptedAnswer.length();
					statObject.setacceptedAnswerLength(length);
				}
				long time = Long.parseLong(values[6].toString().trim());
				statObject.setTime(time);
				answerStatsMap.put(values[5].toString().trim(), statObject);
			}
		}
		br.close();
	}
	
	
	
	public static void createCSV(HashMap<String,HashMap<String,AnswerStatsJavaBean>> statMap) throws IOException{
		String newFilePath1="d:\\AnswerStats.csv";
		BufferedReader br =null;
		FileWriter fr1= new FileWriter(newFilePath1,true);
		fr1.append("UserId");
		fr1.append(',');
		fr1.append("Answers");
		fr1.append(',');
		fr1.append("Average length of Ans");
		fr1.append(',');
		fr1.append("Accepted_Answers");
		fr1.append(',');
		fr1.append("Average length of Accepted answer");
		fr1.append(',');
		fr1.append("Time");
		fr1.append('\n');
		
	}
	

}
