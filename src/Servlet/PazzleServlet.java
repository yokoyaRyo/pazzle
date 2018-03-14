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
		response.setContentType("application/json;charset=UTF-8");
		PrintWriter out = response.getWriter();//ここの順番はこれじゃないと文字化けする

		System.out.println("SELECT");
		ScoreDao scoreDao = new ScoreDao();
		JSONArray json = new JSONArray();
		json = scoreDao.selectScore();

		System.out.println("ダオの後" + json);
		out.println(json);
		out.flush();
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html; charset=UTF-8");
		PrintWriter out = response.getWriter();

		System.out.println("INSERT");
		ScoreDao scoreDao = new ScoreDao();

		String num = request.getParameter("num");
		String player = request.getParameter("player");
		System.out.println("登録情報" + num + player);
		scoreDao.InsertScore(num, player);

	}

}

