package mandarproject;

public class AnswerStatsJavaBean {
	int answerCount=0;
	int acceptedAnswerCount=0;
	long time=0;
	double averageAnswerLength=0;
	double averageAcceptedAnswerLength=0;
	double answerLength=0.0;
	double acceptedAnswerLength=0.0; 
	
	public int getAnswerCount(){
		return answerCount;
	}
	
	public void incrementAnswerCount(){
		answerCount++;
	}
	
	public int getAcceptedAnswerCount(){
		return acceptedAnswerCount;
	}
	
	public void incrementAcceptedAnswerCount(){
		acceptedAnswerCount++;
	}
	
	public long getTime(){
		return time;
	}
	
	public void setTime(long time){
		this.time=time;
	}
	
	public void setAnswerLength(double length){
		answerLength+=length;
	}
	
	public void setacceptedAnswerLength(double length){
		acceptedAnswerLength+=length ;
	}
	
	public double getAnswerLength(){
		return answerLength;
	}
	
	public double getAcceptedAnswerLength(){
		return acceptedAnswerLength;
	}
	
	
	
}
