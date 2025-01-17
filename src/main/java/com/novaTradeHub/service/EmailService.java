package com.novaTradeHub.service;

import org.springframework.mail.MailException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

	private JavaMailSender javaMailSender;

	public void sendVerificationOtpEmail(String email, String otp) throws MessagingException {
		MimeMessage mimeMessage = javaMailSender.createMimeMessage();

		MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, "utf-8");

		String subject = "Verify OTP";
		String text = "Your verification code is " + otp;

		messageHelper.setSubject(subject);
		messageHelper.setText(text);
		messageHelper.setTo(email);
		try {
			javaMailSender.send(mimeMessage);
		} catch (MailException e) {
			// TODO: handle exception
			throw new MailSendException(e.getMessage());
		}
	}
}

//MIME stands for Multipurpose Internet Mail Extensions, which is a standard for formatting messages to include multimedia content like images or attachments.
