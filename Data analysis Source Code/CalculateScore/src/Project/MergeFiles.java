package mandarproject;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

public class MergeFiles {
	public static void main(String[] args) throws IOException {
		
		for(int fileNo=1;fileNo<=216;fileNo++){
			int lineNo=1;
			String path="C:\\Users\\Rajat\\Desktop\\Project\\Project\\stackoverflow\\01_01_2014-12_31_2014["+fileNo+"].csv";
			BufferedReader br = new BufferedReader(new FileReader(path));
			String line="";
			System.out.println("File: "+fileNo);
			while((line=br.readLine())!=null){
				//System.out.println("Line No: "+lineNo++);
				String[] values = line.split(",");
				for(String value:values){
					//System.out.print(value+" ");
				}
				//System.out.println();
			}
		}
	}
	
}
