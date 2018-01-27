package Dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class ScoreDao {

	public JSONArray selectScore() {
		DBAccess DBAccess = new DBAccess();
		Connection con = DBAccess.dbAccess();
		String sql = "SELECT * FROM score ORDER BY score DESC LIMIT 10;";

		JSONArray json = new JSONArray();

		try {
			PreparedStatement stmt = con.prepareStatement(sql);
			ResultSet rs = stmt.executeQuery();
			System.out.println("rs:" + rs);
			while (rs.next()) {
				int score = rs.getInt("score");
				String player = rs.getString("player");

				JSONObject result = new JSONObject();
				result.put("score:", score);
				result.put("player:", player);

				json.put(result);
				System.out.println(json);
			}


			System.out.println("Dao;" + json);

			stmt.close();
			con.close();

		} catch (SQLException e) {
			// TODO 自動生成された catch ブロック
			e.printStackTrace();
		} catch (JSONException e) {
			// TODO 自動生成された catch ブロック
			e.printStackTrace();
		}

		return json;

	}

	public void InsertScore(String scoreStr, String player) {
		DBAccess DBAccess = new DBAccess();
		Connection con = DBAccess.dbAccess();
		String sql = "INSERT INTO score VALUES (?, ?);";

		int score = Integer.parseInt(scoreStr);

		try {
			PreparedStatement stmt = con.prepareStatement(sql);
			stmt.setInt(1, score);
			stmt.setString(2, player);

			stmt.executeUpdate();

		} catch (SQLException e) {
			// TODO 自動生成された catch ブロック
			e.printStackTrace();
		}

	}
}
