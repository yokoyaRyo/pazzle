package Dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBAccess {
	public Connection dbAccess() {
		Connection connection = null;
		try {
			Class.forName("org.postgresql.Driver");

			String url = "jdbc:postgresql://localhost:5432/pazzle";
			String user = "axizuser";
			String pass = "axiz";
			connection = DriverManager.getConnection(url, user, pass);
			System.out.println("DBにアクセスしました。");
		} catch (ClassNotFoundException | SQLException e) {
			// TODO 自動生成された catch ブロック
			e.printStackTrace();
		}
		return connection;
	}
}
