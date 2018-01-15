package Servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;

import Dao.ScoreDao;

public class PazzleServlet extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		response.setContentType("text/html; charset=UTF-8");

		System.out.println("SELECT");
		ScoreDao scoreDao = new ScoreDao();

		JSONArray json = scoreDao.selectScore();

		System.out.println(json);
//		int scoreArray[] = new int[10];
//		for(int i = 0; i < json.length(); i++) {
//			scoreArray[i] = json.get(i).score();
//
//		}
		out.println(json);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		response.setContentType("text/html; charset=UTF-8");

		System.out.println("INSERT");
		ScoreDao scoreDao = new ScoreDao();

		String num = request.getParameter("num");
		String player = request.getParameter("player");


		scoreDao.InsertScore(num, player);

	}

}

