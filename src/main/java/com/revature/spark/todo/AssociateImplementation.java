package com.revature.spark.todo;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.revature.spark.beans.Call;
import com.revature.spark.beans.User;

/**
 * Within this class, you will implement the logic to calculate data for various
 * reports.
 * 
 * @author Your Name Here
 * 
 */
public class AssociateImplementation {

	/**
	 * Find the sum of all call times. This is the time all employees have spent on
	 * the phone.
	 * 
	 * @param calls
	 * @return
	 */
	public Double sum(List<Call> calls) {

		List <Call> sentObjects = calls;
		
		
		int size = sentObjects.size();
		double sum = 0;
		
		
		for( int i = 0; i < size; i++ ) {
			
			
			
			   sum += sentObjects.get(i).getCallTime();
				
			   
		}
		
	

		return sum;
	}

	/**
	 * Find the lowest call time out of all calls.
	 * 
	 * @param calls
	 * @return
	 */
	public Double min(List<Call> calls) {

		List <Call> sentObjects = calls;
		int size = sentObjects.size();
		double sum = 1000000;
		
		
		for( int i = 0; i < size; i++ ) {
			
			if (sum >  sentObjects.get(i).getCallTime()) {
	 sum = sentObjects.get(i).getCallTime();
	 }
			   
		}
			
		
		return sum;
	}

	/**
	 * Find the highest call time out of all calls.
	 * 
	 * @param calls
	 * @return
	 */
	public Double max(List<Call> calls) {
		
		List <Call> sentObjects = calls;
		int size = sentObjects.size();
		double sum = 1;
		   
		
		for( int i = 0; i < size; i++ ) {
			
			if (sum <  sentObjects.get(i).getCallTime()) {
	       sum = sentObjects.get(i).getCallTime();
	       
	      
	 }
			
		}
			
		
		 
		
			

		

		return sum;
	










	}

	/**
	 * Find the average call time of all calls.
	 * 
	 * @param calls
	 * @return
	 */
	public Double avg(List<Call> calls) {
		List <Call> sentObjects = calls;
		double size = sentObjects.size();
		double sum = 1;
		   
		
		for( int i = 0; i < size; i++ ) {
			
			
			   sum += sentObjects.get(i).getCallTime();
			   
			
		}
		double temp = sum/size;
		
	 long rounded = Math.round(temp);
		double something = (int) rounded;
		
	
		
		return something;
	}

	/**
	 * Find the median call time of all calls.
	 * 
	 * @param calls
	 * @return
	 */
	public Double median(List<Call> calls) {
		
		
		
		
		
		List <Call> sentObjects = calls;
		int size = sentObjects.size();

		double[] newarray = new double [size];

		//sentObjects.get(0).getCallTime();
		
		 for (int x = 0; x < size ; x++) {
       	  
       	  
       	  
	         newarray[x] = sentObjects.get(x).getCallTime();
	        	
	     	
	       
	          }
		Arrays.sort(newarray);
		
		 for (int x = 0; x < size  ; x++) {
	       	  

	     	
	       
	          }
		 
		 
		 double median;
		 if (newarray.length % 2 == 0)
		     median = ((double)newarray[newarray.length/2] + (double)newarray[newarray.length/2 - 1])/2;
		 else
		     median = (double) newarray[newarray.length/2];
		
		

		    

		return median;
	

		
	
	}

	/**
	 * !! BONUS CHALLENGE REQUIREMENT !!
	 * 
	 * Find the average call time for each user.
	 * 
	 * @param calls
	 * @return
	 */
	public Map<User, Double> avgCallTimePerUser(List<Call> calls) {
		
		
		List <Call> sentObjects = calls;
		int size = sentObjects.size();
		Map<User, Double> averageCallsPerUser = new HashMap<>();
		
		double tempCallTime = 0;
		double counter = 0;
		double average = 0;
		User tempUser = sentObjects.get(0).getUser();
		int userId = 0;
		
		
		
		for (int x = 0; x < size  ; x++) {
			
			
			userId = sentObjects.get(x).getUser().getId();
			
			
	//	System.out.println(sentObjects.get(x).getUser().getId()+ " " + sentObjects.get(x).getCallTime() + "\n");
			
				
		
		for (int y =0; y < size  ; y++) {
			
				
				
		if( sentObjects.get(y).getUser().getId() == userId) {
			
			tempCallTime +=  sentObjects.get(y).getCallTime();
			counter++;
			

		
		tempUser = sentObjects.get(y).getUser();  
		}
		
		}
	
		average = tempCallTime/counter;
		averageCallsPerUser.put(tempUser, average);
		tempCallTime =0;
		counter=0;
	
	
		}

		 System.out.println(averageCallsPerUser);
		
		
		
		return averageCallsPerUser;
	}

}
